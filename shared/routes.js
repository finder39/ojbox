Router.map(function() {
  // home template will be returned for all routes
  this.route('app', {
    path: '*',
    waitOn: function() {
      console.log("app waiton");
      return Meteor.subscribe("settings");
    },
    onBeforeAction: function() {
      console.log("home onbeforeaction");
      // if the player hasn't been set up yet, go to settings page
      if (this.ready()) {
        var settings = Settings.findOne();
        if (settings && settings.jukeboxPlayerId &&
            settings.jukeboxPlayerId === 0) {
          Session.set("noActiveJukebox", true);
        }
      }
    }
  });
});
