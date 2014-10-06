Playlist = new Mongo.Collection("playlist");
CurrentSong = new Mongo.Collection("currentSong");

Playlist.allow({
  'insert': function(userId, doc) {
    // if it's already in the playlist, don't allow
    if (Playlist.findOne({uri: doc.uri})) {
      return false;
    }
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    // only allowed to remove the songs you added
    return doc.addedByUserId === userId;
  }
});

CurrentSong.allow({
  'insert': function(userId, doc) {
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return true;
  }
});
