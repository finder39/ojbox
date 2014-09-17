Settings = new Mongo.Collection("settings");
Playlist = new Mongo.Collection("playlist");
CurrentSong = new Mongo.Collection("currentSong");

var isMainPlayer = function() {
  if (!Settings.findOne.playerId || !Meteor.connection._lastSessionId) {
    return true;
  }
  return Settings.findOne().playerId === Meteor.connection._lastSessionId;
}

Settings.allow({
  'insert': function(userId, doc) {
    return false;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

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
    return isMainPlayer() || doc.addedByUserId === userId;
  }
});

CurrentSong.allow({
  'insert': function(userId, doc) {
    return isMainPlayer();
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return isMainPlayer();
  }
});
