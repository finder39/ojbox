Template.playlist.helpers({
  currentSong: function() {
    return CurrentSong.findOne();
  },
  song: function() {
    return Playlist.find({}, {
      // sort by voteTotal, which is upvotes - downVotes,
      // breaking ties by time added
      sort: [["voteTotal", "desc"], ["addedAt", "asc"]]
    });
  },
  thumbUpIcon: function() {
    return _.contains(this.userIdsWhoVotedUp, Meteor.userId()) ?
      "fa-thumbs-up" : "fa-thumbs-o-up";
  },
  thumbDownIcon: function() {
    return _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ?
      "fa-thumbs-down" : "fa-thumbs-o-down";
  },
  voteDisabled: function() {
    return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
            _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "vote-disabled" : "";
  },
  tooltipUp: function() {
    return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "You've added this song or already voted it up" : "Vote this song up";
  },
  tooltipDown: function() {
    return (_.contains(this.userIdsWhoVotedDown, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "You've added this song or already voted it down" : "Vote this song down";
  },
  noSongs: function() {
    return CurrentSong.find().count() === 0;
  }
});

Template.playlist.events({
  "click .upvote, touchstart .upvote": function(event) {
    event.preventDefault();
    var currentTarget = $(event.currentTarget);
    if (currentTarget.hasClass("vote-disabled")) {
      return;
    }
    console.log(event.currentTarget);

    Playlist.update(this._id, {
      $push: {userIdsWhoVotedUp: Meteor.userId()},
      $inc: {upvotes: 1, voteTotal: 1}
    });
    $(event.currentTarget).addClass("vote-disabled");
  },
  "click .downvote, touchstart .downvote": function(event) {
    event.preventDefault();
    var currentTarget = $(event.currentTarget);
    if (currentTarget.hasClass("vote-disabled")) {
      return;
    }
    console.log(event.currentTarget);

    Playlist.update(this._id, {
      $push: {userIdsWhoVotedDown: Meteor.userId()},
      $inc: {downvotes: 1, voteTotal: -1}
    });
    $(event.currentTarget).addClass("vote-disabled");
  }
});
