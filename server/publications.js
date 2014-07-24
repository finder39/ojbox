Meteor.publish("settings", function() {
  return Settings.find({}, {limit: 1});
});

// Streams
Chat = new Meteor.Stream("chat");

Chat.permissions.write(function(event) {
  return true;
});

Chat.permissions.read(function(event) {
  return true;
});

Chat.addFilter(function(eventName, args) {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (args[0] && user && user.username) {
      return [args[0], user.username];
    }
  }
  return args;
})
