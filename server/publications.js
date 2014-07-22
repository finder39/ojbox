Meteor.publish("settings", function() {
  return Settings.find({}, {
    limit: 1,
    // do not include password
    fields: {password: 0}
  });
});
