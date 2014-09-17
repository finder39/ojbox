// Mongo collections
Meteor.publish("settings", function() {
  return Settings.find({}, {limit: 1});
});
Meteor.publish("playlist", function() {
  return Playlist.find();
});
Meteor.publish("currentSong", function() {
  return CurrentSong.find({}, {limit: 1});
});

// Streams
Chat = new Meteor.Stream("chat");
PlaylistTracker = new Meteor.Stream("playlistTracker");

Chat.permissions.write(function(event) {
  return true;
});

Chat.permissions.read(function(event) {
  return true;
});

PlaylistTracker.permissions.write(function(event) {
  return true;
});

PlaylistTracker.permissions.read(function(event) {
  return true;
});

Chat.addFilter(function(eventName, args) {
  // switch the user id with the user's name
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (args[0] && user && user.username) {
      return [args[0], user.username];
    }
  }
  return args;
});
