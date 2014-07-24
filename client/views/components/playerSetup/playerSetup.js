Template.playerSetup.events({
  "submit .player-setup form": function(event) {
    event.preventDefault();
    console.log("setting up player on this connection");
    // use the session id, and not the user id, so it's limited to 1 window
    Settings.update(Settings.findOne()._id, {
      $set: {playerId: Meteor.connection._lastSessionId}
    });
  }
});
