Template.playlist.helpers({
  currentSong: function() {
    return CurrentSong.findOne();
  },
  song: function() {
    return Playlist.find({}, {
      // sort by upvotes, breaking ties by time added
      sort: [["upvotes", "desc"], ["addedAt", "asc"]]
    });
  },
  thumbIcon: function() {
    return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "fa-thumbs-up" : "fa-thumbs-o-up";
  },
  voteDisabled: function() {
    return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "vote-disabled" : "";
  },
  tooltip: function() {
    return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
            this.addedByUserId === Meteor.userId()) ?
            "You've added this song or voted it up" : "Vote this song up";
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
      $inc: {upvotes: 1}
    });
    $(event.currentTarget).addClass("vote-disabled");
  }
});
