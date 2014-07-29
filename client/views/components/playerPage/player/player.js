var currentSong;
var nextSong;

var msToMin = function(ms) {
    // The "<< 0" is a bit shift of 0 bits. This can only be done on an integer,
    // and causes a typecast
    return (ms / 1000 / 60) << 0;
}

var msToSec = function(ms) {
    var seconds = (ms / 1000 % 60) << 0;
    // return a leading zero if the amount of seconds is less than 9
    return seconds > 9 ? seconds : '0' + seconds;
}

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  onload: function() {
    console.log("song loaded");
    Session.set("songLoaded", true);
  },
  whileplaying: function() {
    // update the time display
    $(".song-time").html(msToMin(this.position) + ':' + msToSec(this.position));
    // update the progress bar
    $('.progress-bar').width((this.position / this.duration * 100) + '%');
  }
}

SC.initialize({
  client_id: "dab79335daff5c0c3b601594af49d985"
});

Template.player.helpers({
  mainPlayer: function() {
    return Meteor.connection._lastSessionId === Settings.findOne().playerId;
  },
  loadStreaming: function() {
    var firstTwoSongs = Playlist.find({}, {
      limit: 2,
    }).fetch();
    console.log(firstTwoSongs);
    if (firstTwoSongs) {
      if (firstTwoSongs[0]) {
        SC.stream(firstTwoSongs[0].uri, soundManagerOptions, function(sound) {
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

Template.player.events({
  "click .fa-play": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    var playpause = $(".fa-play");
    currentSong.play();
    playpause.removeClass('fa-play');
    playpause.addClass('fa-pause');
  },
  "click .fa-pause": function(event) {
    if (!_.isObject(currentSong)) {
      return;
    }
    var playpause = $(".fa-pause");
    currentSong.pause();
    playpause.removeClass('fa-pause');
    playpause.addClass('fa-play');
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
  },
  "click .seek-bar": function(event) {
    // change the position of the song
    if (!_.isObject(currentSong)) {
      return;
    }
    console.log(event.currentTarget);
    console.log(event.offsetX);
    console.log(event);
    var seekbar = $(".seek-bar");
    currentSong.setPosition(
      currentSong.duration * event.offsetX / seekbar.outerWidth()
    );
  }
});

