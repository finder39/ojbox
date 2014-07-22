Router.map(function() {
  this.route('settings', {
    path: /\/settings|\/config|\/configure|\/setup|\/set-up/,
    waitOn: function() {
      return Meteor.subscribe("settings");
    },
    data: function() {
      return Settings.findOne();
    },
    onBeforeAction: function() {
      Session.set("authorized", false);
      Session.set("emptyPassword", false);
      Session.set("passwordTries", 0);
    }
  });
  this.route('player', {
    path: '/player'
  });
  // home template will be returned for all routes not above
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
        if (!Settings.findOne()) {
          Router.go('/settings');
        }
      }
      // if there is a user logged in already, go to the player
      if (Meteor.userId()) {
        Router.go('/player');
      }
    }
  });
});
