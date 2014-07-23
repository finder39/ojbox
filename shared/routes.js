Router.map(function() {
  // home template will be returned for all routes
  this.route('home', {
    path: '*',
    waitOn: function() {
      console.log("home waiton");
      return Meteor.subscribe("settings");
    },
    data: function() {
      console.log("home data");
      return Settings.findOne();
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
