Template.app.helpers({
  playerIsSetup: function() {
    return Settings.findOne().playerId;
  }
})
