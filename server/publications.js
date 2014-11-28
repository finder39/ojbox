// Mongo collections
Meteor.publish("playlist", function() {
  if (!this.userId) {
    return false;
  }
  var user = Meteor.users.findOne({_id: this.userId}, {
    $fields: {profile: 1}
  });
  return Playlist.find({boxname: user.profile.boxname});
});
Meteor.publish("currentSong", function() {
  if (!this.userId) {
    return false;
  }
  var user = Meteor.users.findOne({_id: this.userId}, {
    $fields: {profile: 1}
  });
  return CurrentSong.find({boxname: user.profile.boxname});
});
Meteor.publish("boxes", function() {
  return Boxes.find({});
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
    if (args[0] && user && user.username &&
        user.profile && user.profile.boxname) {
      return [args[0], user.username, user.profile.boxname];
    }
  }
  return args;
});
