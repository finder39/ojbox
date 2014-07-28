Router.map(function() {
  // single page app
  // this template will be returned for all routes
  this.route('app', {
    path: '*',
    waitOn: function() {
      Meteor.subscribe("settings");
      Meteor.subscribe("playlist");
      return Meteor.subscribe("currentSong");
    },
  });
});
