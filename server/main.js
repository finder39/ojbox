Meteor.startup(function() {
  // initial setup
  if (!Settings.findOne()) {
    Settings.insert({
      playerId: 0,
    });
  }
});
