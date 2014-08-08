var currentSound = null;
var nextSong = null;


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
    Deps.nonreactive(function() {
      OJPlayer.loaded(true);
    });
    Session.set("loading", false);
  },
  whileplaying: function() {
    updateSeekBarDisplay(this.position / this.duration);
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
    console.log("load streaming called");
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
    console.log("pause play called");
    if (this.paused) {
      if (_.isObject(currentSound) && this.loaded) {
        currentSound.pause();
      }
      return "play";
    } else {
      if (_.isObject(currentSound) && this.loaded) {
        currentSound.play();
      }
      return "pause";
    }
  },
  playerDisabled: function() {
    console.log("player is disabled called");
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
    console.log("player is disabled called");
    return this.loaded ? "" : "disabled";
  }
});

Template.hostPlayer.events({
  "click .fa-play": function(event) {
    event.preventDefault();
    console.log("clicked play");
    if (this.loaded === false) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: false}
    });
    $(".fa-play").switchClass("fa-play", "fa-pause");
  },
  "click .fa-pause": function(event) {
    event.preventDefault();
    console.log("clicked pause");
    if (this.loaded === false) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: true}
    });
    $(".fa-pause").switchClass("fa-pause", "fa-play");
  },
  "click .fa-step-forward": function(event) {
    event.preventDefault();
    console.log("clicked fast forward");
    if (this.loaded === false) {
      return;
    }
    currentSound.destruct();
    OJPlayer.nextSong(this);
    updateSeekBarDisplay(0);
  },
  "click .seek-bar": function(event) {
    event.preventDefault();
    if (this.loaded === false) {
      return;
    }
    var seekPercentage = event.offsetX / $(".seek-bar").outerWidth();
    var estimatedPosition = currentSound.durationEstimate * seekPercentage;
    updateSeekBarDisplay(seekPercentage);
    // change the position of the song
    currentSound.setPosition(estimatedPosition);
  }
});

Template.clientPlayer.events({
  "click .fa-play": function(event) {
    event.preventDefault();
    console.log("clicked play");
    if (this.loaded === false) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: false}
    });
    $(".fa-play").switchClass("fa-play", "fa-pause");
  },
  "click .fa-pause": function(event) {
    event.preventDefault();
    console.log("clicked pause");
    if (this.loaded === false) {
      return;
    }
    CurrentSong.update(this._id, {
      $set: {paused: true}
    });
    $(".fa-pause").switchClass("fa-pause", "fa-play");
  },
});

