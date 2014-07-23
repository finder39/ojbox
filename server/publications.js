Meteor.publish("settings", function() {
  return Settings.find({}, {limit: 1});
});
