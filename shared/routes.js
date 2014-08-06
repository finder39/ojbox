Router.map(function() {
  // single page app
  // this template will be returned for all routes
  this.route('app', {
    path: '*',
    waitOn: function() {
      console.log("iron router waiting on");
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    onRun: function() {
      Session.set("soundLoaded", false);
    }
  });
});
