var currentSound;
var nextSong;


var updateSeekBarDisplay = function(positionMillis, percentage) {
  // update the progress bar
  $('.progress-bar').width((percentage * 100) + '%');
}

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  onload: function() {
    console.log("song loaded");
    Session.set("soundLoaded", true);
    Session.set("playerIsDisabled", false);
  },
  whileplaying: function() {
    updateSeekBarDisplay(this.position, this.position / this.duration);
  },
  onfinish: function() {
    console.log("song finished playing");
    // destroy the song and remove it from CurrentSong
    this.destruct();
    OJPlayer.nextSong();
    updateSeekBarDisplay(0, 0);
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    Session.set("playerIsDisabled", true);
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
});

Template.hostPlayer.helpers({
  loadStreaming: function() {
    if (Session.equals("soundLoaded", false)) {
      if (CurrentSong.find().count() !== 0) {
        var song = CurrentSong.findOne();
        SC.stream(
          song.uri, soundManagerOptions, function(sound) {
          currentSound = sound;
        });
      }
    }
  },
  playingSong: function() {
    return CurrentSong.findOne();
  },
  playPauseIcon: function() {
    return this.paused ? "play" : "pause";
  },
  playerDisabled: function() {
    return Session.equals("playerIsDisabled", true) ? "disabled" : "";
  }
});

Template.clientPlayer.helpers({
  playingSong: function() {
    return CurrentSong.findOne();
  },
  playPauseIcon: function() {
    return this.paused ? "play" : "pause";
  },
});

Template.player.events({
  "click .fa-play": function(event) {
    event.preventDefault();
    console.log("clicked play");
    if (Session.equals("playerIsDisabled", true)) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: false}
    });
    $(".fa-play").switchClass("fa-play", "fa-pause");
    if (_.isObject(currentSound)) {
      currentSound.play();
    }
  },
  "click .fa-pause": function(event) {
    event.preventDefault();
    console.log("clicked pause");
    if (Session.equals("playerIsDisabled", true)) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: true}
    });
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    if (_.isObject(currentSound)) {
      currentSound.pause();
    }
  },
  "click .fa-step-forward": function(event) {
    event.preventDefault();
    if (Session.equals("playerIsDisabled", true) || !_.isObject(currentSound)) {
      return;
    }
    currentSound.destruct();
    OJPlayer.nextSong();
    updateSeekBarDisplay(0, 0);
    $(".fa-pause").switchClass("fa-pause", "fa-play");
    Session.set("playerIsDisabled", true);
  },
  "click .seek-bar": function(event) {
    event.preventDefault();
    if (Session.equals("playerIsDisabled", true) || !_.isObject(currentSound)) {
      return;
    }
    var seekPercentage = event.offsetX / $(".seek-bar").outerWidth();
    var estimatedPosition = currentSound.durationEstimate * seekPercentage;
    updateSeekBarDisplay(estimatedPosition, seekPercentage);
    // change the position of the song
    currentSound.setPosition(estimatedPosition);
  }
});

