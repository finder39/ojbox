var currentSong;
var nextSong;

SC.initialize({
  client_id: "dab79335daff5c0c3b601594af49d985"
});

Template.player.helpers({
  mainPlayer: function() {
    return Meteor.connection._lastSessionId === Settings.findOne().playerId;
  }
});

Template.player.events({
  "click .playpause": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    console.log(currentSong);
    var playpause = $(".playpause");
    if (playpause.hasClass('fa-play')) {
      currentSong.play();
      playpause.removeClass('fa-play');
      playpause.addClass('fa-pause');
    } else {
      currentSong.pause();
      playpause.removeClass('fa-pause');
      playpause.addClass('fa-play');
    }
  },
  "click .fa-fast-forward": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    // destroy current song
    //currentSong.destruct();
    // clear current song from collection
    // add next song from top of playlist to currentsong collection
    console.log("fast forward clicked");
  }
});

Template.advancedPlayer.helpers({
  loadStreaming: function() {
    var firstTwoSongs = Playlist.find({}, {
      limit: 2,
    }).fetch();
    console.log(firstTwoSongs);
    if (firstTwoSongs) {
      if (firstTwoSongs[0]) {
        SC.stream(firstTwoSongs[0].uri, function(sound) {
          currentSong = sound;
          console.log(sound);
        });
      }
      if (firstTwoSongs[1]) {
        nextSong = firstTwoSongs[1];
      }
    }
  }
});
