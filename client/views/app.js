// don't need this anymore
Template.app.helpers({
  playerIsSetup: function() {
    return Settings.findOne().playerId;
  }
});
