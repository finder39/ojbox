OJPlayer = {
  currentSound: null,
  startingPosition: null,

  addSongToPlaylist: function(songDoc) {
    var boxname = Meteor.user().profile.boxname;

    songDoc.addedByUsername = Meteor.user().username;
    songDoc.addedByUserId = Meteor.userId();
    songDoc.addedAt = new Date();
    songDoc.upvotes = 0;
    songDoc.downvotes = 0;
    songDoc.voteTotal = 0;
    songDoc.boxname = boxname;

    // if CurrentSong is empty, put it there instead
    var current;
    Tracker.nonreactive(function() {
      current = CurrentSong.find({boxname: boxname}).count();
    });
    if (!current) {
      songDoc.position = 0;
      CurrentSong.insert(songDoc);
      return;
    }

    Playlist.insert(songDoc);
  },
  nextSong: function(currentId) {
    console.log("nextsong called");
    // clear the current song if there is one
    this.currentSound = null;
    this.startingPosition = null;
    CurrentSong.remove(currentId);
    var firstPlaylistSong = OJPlayer.topSong();
    if (!firstPlaylistSong) {
      console.log("no first playlist song");
      return false;
    }
    // remove the top of the playlist
    Playlist.remove(firstPlaylistSong._id);
    firstPlaylistSong.position = 0;

    // insert the top playlist song
    CurrentSong.insert(firstPlaylistSong);
    return true;
  },
  topSong: function() {
    return Playlist.findOne(
      {boxname: Meteor.user().profile.boxname},
      // sort by voteTotal, which is upvotes - downvotes,
      // breaking ties by time added
      {sort: [["voteTotal", "desc"], ["addedAt", "asc"]]}
    );
  },
  setPosition: function(currentId, newPosition) {
    currentId && CurrentSong.update(currentId, {
      $set: {position: newPosition}
    });
  }
};

