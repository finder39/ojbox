// used to hold the current SoundManager2 sound object
var currentSound = null;

// update the seek bar for the clients at intervals
var okToUpdate = true;
// how often to update the client seek bar
var seekBarUpdateInterval = 2000;

var updateSeekBarDisplay = function(percentage) {
  // update the progress bar
  $('.progress-bar').width((percentage * 100) + '%');
}

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  onload: function() {
    console.log("song loaded");
    var startingPosition;
    Deps.nonreactive(function() {
      OJPlayer.loaded(true);
      startingPosition = OJPlayer.getStartingPosition();
    });
    currentSound.setPosition(startingPosition);
    currentSound.play();
    currentSound.pause();
    Session.set("loading", false);
  },
  whileplaying: function() {
    updateSeekBarDisplay(this.position / this.duration);
    // update the position
    if (okToUpdate) {
      // make sure we don't update too often
      okToUpdate = false;
      var current;
      Deps.nonreactive(function() {
        current = CurrentSong.findOne();
      });
      CurrentSong.update(current._id, {
        $set: {
          position: this.position,
        }
      });
      // set a timeout to be able to update again in a few seconds
      Meteor.setTimeout(function() {
        okToUpdate = true;
      }, seekBarUpdateInterval);
    }
  },
  onfinish: function() {
    console.log("song finished playing");
    // destroy the song and remove it from CurrentSong
    this.destruct();
    OJPlayer.nextSong();
    updateSeekBarDisplay(0);
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
    if (!this.loaded && Session.equals("loading", false)) {
      console.log("call to stream music");
      // don't want the song loading multiple times
      Session.set("loading", true);
      SC.stream(
        this.uri, soundManagerOptions, function(sound) {
        currentSound = sound;
      });
    }
  },
  playingSong: function() {
    return CurrentSong.findOne();
  },
  playPauseIcon: function() {
    if (this.paused) {
      if (_.isObject(currentSound) &&
          this.loaded &&
          currentSound.paused === false) {
        currentSound.pause();
      }
      return "play";
    } else {
      if (_.isObject(currentSound) &&
          this.loaded &&
          currentSound.paused === true) {
        currentSound.resume();
      }
      return "pause";
    }
  },
  playerDisabled: function() {
    return this.loaded ? "" : "disabled";
  },
});

Template.clientPlayer.helpers({
  playingSong: function() {
    return CurrentSong.findOne();
  },
  playPauseIcon: function() {
    return this.paused ? "play" : "pause";
  },
  playerDisabled: function() {
    return this.loaded ? "" : "disabled";
  },
  updateSeekBar: function() {
    updateSeekBarDisplay(this.position / this.duration);
  }
});

Template.hostPlayer.events({
  "click .playpause, touchstart .playpause": function(event) {
    event.preventDefault();
    console.log("clicked play/pause");
    if (this.loaded === false) {
      return;
    }
    if ($(".playpause").has(".fa-play").length) {
      CurrentSong.update(this._id, {
        $set: {paused: false}
      });
      $(".fa-play").switchClass("fa-play", "fa-pause");
    } else {
      CurrentSong.update(this._id, {
        $set: {paused: true}
      });
      $(".fa-pause").switchClass("fa-pause", "fa-play");
    }
  },
  "click .ff-button, touchstart .ff-button": function(event) {
    event.preventDefault();
    console.log("clicked fast forward");
    if (this.loaded === false) {
      return;
    }
    currentSound.destruct();
    OJPlayer.nextSong(this);
    updateSeekBarDisplay(0);
  },
  "click .seek-bar, touchstart .seek-bar": function(event) {
    event.preventDefault();
    if (this.loaded === false) {
      return;
    }
    var seekPercentage = event.offsetX / $(".seek-bar").outerWidth();
    var estimatedPosition = currentSound.durationEstimate * seekPercentage;
    // change the position of the song
    currentSound.setPosition(estimatedPosition);
  }
});

Template.clientPlayer.events({
  "click .playpause, touchstart .playpause": function(event) {
    event.preventDefault();
    console.log("clicked play/pause");
    if (this.loaded === false) {
      return;
    }
    if ($(".playpause").has(".fa-play").length) {
      CurrentSong.update(this._id, {
        $set: {paused: false}
      });
      $(".fa-play").switchClass("fa-play", "fa-pause");
    } else {
      CurrentSong.update(this._id, {
        $set: {paused: true}
      });
      $(".fa-pause").switchClass("fa-pause", "fa-play");
    }
  },
});

