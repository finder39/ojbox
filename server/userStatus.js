// if the connection that just logged out is the one hosting the jukebox,
// notify the rest of the clients that there is no player anymore
UserStatus.events.on("connectionLogout", function(fields) {
  var settings = Settings.findOne();
  if (settings && settings.playerId && fields.connectionId &&
      settings.playerId === fields.connectionId) {
    Settings.update(settings._id, {
      $set: {playerId: 0}
    });
  }
});
