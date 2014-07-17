Router.map(function() {
  this.route('settings', {
    path: /\/settings|\/config|\/configure|\/setup|\/set-up/
  });
  this.route('player', {
    path: '/player'
  });
  // home template will be returned for all routes not above
  this.route('home', {
    path: '*',
    onRun: function() {
      // if the player hasn't been set up yet, go to settings page
      if (!Settings.findOne()) {
        Router.go('/settings');
      }
      // if there is a user logged in already, go to the player
      if (Meteor.userId()) {
        Router.go('/player');
      }
    }
  });
});
