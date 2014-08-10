OJPlayer = {
  addSongToPlaylist: function(songDoc) {
    songDoc.addedByUsername = Meteor.user().username;
    songDoc.addedByUserId = Meteor.userId();
    songDoc.addedAt = new Date();
    songDoc.upvotes = 0;
    songDoc.downvotes = 0;
    songDoc.voteTotal = 0;

    // if CurrentSong is empty, put it there instead
    var current;
    Deps.nonreactive(function() {
      current = CurrentSong.find().count();
    });
    if (!current) {
      songDoc.position = 0;
      songDoc.paused = true;
      songDoc.loaded = false;
      CurrentSong.insert(songDoc);
      return;
    }

    Playlist.insert(songDoc);
  },
  nextSong: function(current) {
    // clear the current song if there is one
    Deps.nonreactive(function() {
      current = current || CurrentSong.findOne();
    });
    if (current) {
      CurrentSong.remove(current._id);
    }
    var firstPlaylistSong = OJPlayer.topSong();
    if (!firstPlaylistSong) {
      return false;
    }
    // remove the top of the playlist
    Playlist.remove(firstPlaylistSong._id);
    firstPlaylistSong.position = 0;
    if (current) {
      // set the next song to play or pause depending on the last one
      firstPlaylistSong.paused = current.paused;
    } else {
      firstPlaylistSong.paused = true;
    }
    firstPlaylistSong.loaded = false;

    // insert the top playlist song
    CurrentSong.insert(firstPlaylistSong);
    return true;
  },
  topSong: function() {
    return Playlist.findOne({}, {
      // sort by voteTotal, which is upvotes - downvotes,
      // breaking ties by time added
      sort: [["voteTotal", "desc"], ["addedAt", "asc"]]
    });
  },
  pause: function(current) {
    current && CurrentSong.update(current._id, {
      $set: {paused: true}
    });
  },
  play: function(current) {
    current && CurrentSong.update(current._id, {
      $set: {paused: false}
    });
  },
  loaded: function(isLoaded) {
    var current = CurrentSong.findOne();
    current && CurrentSong.update(current._id, {
      $set: {loaded: isLoaded}
    });
  },
  getStartingPosition: function() {
    return CurrentSong.findOne().position;
  }
};

