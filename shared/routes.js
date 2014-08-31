Router.map(function() {
  // single page app
  // this template will be returned for all routes
  this.route('app', {
    path: '*',
    waitOn: function() {
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    onRun: function() {
      Session.set("loading", false);
    }
  });
});
