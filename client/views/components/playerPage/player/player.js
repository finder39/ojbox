var currentSong;
var nextSong;

//var msToMin = function(ms) {
    //// The "<< 0" is a bit shift of 0 bits. This can only be done on an integer,
    //// and causes a typecast
    //return (ms / 1000 / 60) << 0;
//}

//var msToSec = function(ms) {
    //var seconds = (ms / 1000 % 60) << 0;
    //// return a leading zero if the amount of seconds is less than 9
    //return seconds > 9 ? seconds : '0' + seconds;
//}

var updateSeekBarDisplay = function(positionMillis, percentage) {
  // update the song time
  //$(".song-time").html(msToMin(positionMillis) + ':' + msToSec(positionMillis));
  // update the progress bar
  $('.progress-bar').width((percentage * 100) + '%');
}

var enablePlayer = function() {

}

var disablePlayer = function() {

}

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  onload: function() {
    console.log("song loaded");
    // todo: we're going to use this to disable the player until the song is ready to play
    Session.set("songLoaded", true);
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
    if (!_.isObject(currentSong)) {
      return;
    }
    $(".fa-play").switchClass("fa-play", "fa-pause");
    currentSong.play();
  },
  "click .fa-pause": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    currentSong.pause();
  },
  "click .fa-step-forward": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    currentSong.destruct();
    CurrentSong.remove(CurrentSong.findOne()._id);
    updateSeekBarDisplay(0, 0);
    $(".fa-pause").switchClass("fa-pause", "fa-play");
  },
  "click .seek-bar": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    var seekPercentage = event.offsetX / $(".seek-bar").outerWidth();
    var estimatedPosition = currentSong.durationEstimate * seekPercentage;
    updateSeekBarDisplay(estimatedPosition, seekPercentage);
    // change the position of the song
    currentSong.setPosition(estimatedPosition);
  }
});

