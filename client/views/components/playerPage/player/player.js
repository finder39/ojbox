var currentSong;
var nextSong;


var updateSeekBarDisplay = function(positionMillis, percentage) {
  // update the progress bar
  $('.progress-bar').width((percentage * 100) + '%');
}

var enablePlayer = function() {
  $(".player").removeClass("disabled");
}
var disablePlayer = function() {
  $(".player").addClass("disabled");
}

var playerIsDisabled = function() {
  return $(".player").hasClass("disabled");
}

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  onload: function() {
    console.log("song loaded");
    enablePlayer();
  },
  whileplaying: function() {
    updateSeekBarDisplay(this.position, this.position / this.duration);
  },
  onfinish: function() {
    console.log("song finished playing");
    // destroy the song and remove it from CurrentSong
    this.destruct();
    CurrentSong.remove(CurrentSong.findOne()._id);
    updateSeekBarDisplay(0, 0);
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    disablePlayer();
  }
}

// initialize soundcloud api
SC.initialize({
  client_id: "dab79335daff5c0c3b601594af49d985"
});

Template.player.helpers({
  mainPlayer: function() {
    return Meteor.connection._lastSessionId === Settings.findOne().playerId;
  },
  loadCurrentSong: function() {
    console.log("loadcurrentsong called");
    var currentSongDB = CurrentSong.findOne();
    if (currentSongDB) {
      SC.stream(
        currentSongDB.uri, soundManagerOptions, function(sound) {
        currentSong = sound;
      });
    } else if (Playlist.findOne()) {
      var playlistSong = OJPlayer.topSong();
      // remove it from the playlist and add it to current song
      Playlist.remove(playlistSong._id);
      CurrentSong.insert(playlistSong);
    }
  },
  loadNextSong: function() {
    console.log("loadnextsong called");
    var nextSongDB = OJPlayer.topSong();
    nextSongDB && nextSongDB.uri && SC.stream(
      nextSongDB.uri, soundManagerOptions, function(sound) {
      nextSong = sound;
    });
  },
  playingSong: function() {
    return CurrentSong.findOne();
  }
});

Template.player.events({
  "click .fa-play": function(event) {
    if (playerIsDisabled() || !_.isObject(currentSong)) {
      return;
    }
    $(".fa-play").switchClass("fa-play", "fa-pause");
    currentSong.play();
  },
  "click .fa-pause": function(event) {
    if (playerIsDisabled() || !_.isObject(currentSong)) {
      return;
    }
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    currentSong.pause();
  },
  "click .fa-step-forward": function(event) {
    if (playerIsDisabled() || !_.isObject(currentSong)) {
      return;
    }
    currentSong.destruct();
    CurrentSong.remove(CurrentSong.findOne()._id);
    updateSeekBarDisplay(0, 0);
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    disablePlayer();
  },
  "click .seek-bar": function(event) {
    if (playerIsDisabled() || !_.isObject(currentSong)) {
      return;
    }
    var seekPercentage = event.offsetX / $(".seek-bar").outerWidth();
    var estimatedPosition = currentSong.durationEstimate * seekPercentage;
    updateSeekBarDisplay(estimatedPosition, seekPercentage);
    // change the position of the song
    currentSong.setPosition(estimatedPosition);
  }
});

