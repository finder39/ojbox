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

// now we want all clients to get the same thing
var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  onload: function() {
    var startingPosition;
    Tracker.nonreactive(function() {
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
      Tracker.nonreactive(function() {
        current = CurrentSong.findOne();
      });
      //CurrentSong.update(current._id, {
        //$set: {
          //position: this.position,
        //}
      //});
      // set a timeout to be able to update again in a few seconds
      Meteor.setTimeout(function() {
        okToUpdate = true;
      }, seekBarUpdateInterval);
    }
  },
  onfinish: function() {
    // destroy the song and remove it from CurrentSong
    this.destruct();
    OJPlayer.nextSong();
    updateSeekBarDisplay(0);
  }
}

// initialize soundcloud api
//SC.initialize({
  //client_id: "dab79335daff5c0c3b601594af49d985"
//});

Template.player.helpers({
  mainPlayer: function() {
    return Meteor.connection._lastSessionId === Settings.findOne().playerId;
  },
  playingSong: function() {
    return CurrentSong.findOne();
  },
});

Template.hostPlayer.created = function() {
  console.log("hostplayer template created");
  console.log(this.data.uri);
  var uri = this.data.uri;
  SC.whenStreamingReady(function() {
    console.log("streaming ready");
    SC.stream(
      uri, soundManagerOptions, function(sound) {
      OJPlayer.currentSound = sound;
    });
  });
}

Template.hostPlayer.helpers({
  loadStreaming: function() {
    //if (!this.loaded && Session.equals("loading", false)) {
      // don't want the song loading multiple times
      //Session.set("loading", true);
    //console.log("loadstreaming called");
      //SC.stream(
        //this.uri, soundManagerOptions, function(sound) {
        //currentSound = sound;
      //});
    //}
  },
  playingSong: function() {
    return CurrentSong.findOne();
  },
  playPauseIcon: function() {
    //if (this.paused) {
      //if (_.isObject(currentSound) &&
          //this.loaded &&
          //currentSound.paused === false) {
        //currentSound.pause();
      //}
      //return "play";
    //} else {
      //if (_.isObject(currentSound) &&
          //this.loaded &&
          //currentSound.paused === true) {
        //currentSound.resume();
      //}
      //return "pause";
    //}
    return "play";
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
    //if (this.loaded === false) {
      //return;
    //}
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
  "click .ff-next, touchstart .ff-next": function(event) {
    event.preventDefault();
    if (this.loaded === false) {
      return;
    }
    currentSound.destruct();
    OJPlayer.nextSong(this);
    updateSeekBarDisplay(0);
  },
  "click .ff-ten, touchstart .ff-ten": function(event) {
    event.preventDefault();
    if (this.loaded === false) {
      return;
    }
    // skip ahead 10 seconds
    currentSound.setPosition(currentSound.position + 10000);
  }
});

Template.clientPlayer.events({
  "click .playpause, touchstart .playpause": function(event) {
    event.preventDefault();
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

