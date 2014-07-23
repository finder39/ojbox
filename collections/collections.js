Settings = new Meteor.Collection("settings");
Playlist = new Meteor.Collection("playlist");
CurrentSong = new Meteor.Collection("currentSong");

// initial setup
if (Settings.findOne()) {
  Settings.insert({
    jukeboxPlayerId: 0,
  });
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
