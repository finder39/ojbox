OJPlayer = {
  addSongToPlaylist: function(songDoc) {
    // todo: only add to playlist if it's not in playlist already.
    // if it is in the playlist, then vote it up once
    // also, check who is adding it so they don't vote it up
    // by adding it a bunch of times
    // todo: put in order, upvotes, downvotes
    // this means figuring out where to insert the song into the list

    songDoc.addedByUsername = Meteor.user().username;
    songDoc.addedByUserId = Meteor.userId;
    songDoc.addedAt = new Date();
    songDoc.upvotes = 0;
    songDoc.downvotes = 0;

    // if CurrentSong is empty, put it there instead
    if (!CurrentSong.findOne()) {
      songDoc.position = 0;
      songDoc.paused = true;
      songDoc.loaded = true;
      CurrentSong.insert(songDoc);
      return;
    }

    Playlist.insert(songDoc);
  },
  nextSong: function(current) {
    // clear the current song if there is one
    current = current || CurrentSong.findOne();
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
    firstPlaylistSong.paused = true;
    firstPlaylistSong.loaded = false;
    // set the next song to play or pause depending on the last one
    firstPlaylistSong.paused = current.paused;

    // insert the top playlist song
    CurrentSong.insert(firstPlaylistSong);
    return true;
  },
  topSong: function() {
    return Playlist.findOne({}, {
      // sort by upvotes, breaking ties by time added
      sort: [["upvotes", "desc"], ["addedAt", "asc"]]
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
};

