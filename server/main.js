Meteor.startup(function() {
  // initial setup
  if (Settings.find().count() === 0) {
    Settings.insert({
      playerId: 0,
    });
  }
});
