Router.map(function() {
  // single page app
  // this template will be returned for all routes
  // need to have more routes now
  this.route('playerPage', {
    path: '/player',
    waitOn: function() {
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    data: function() {
      console.log("data function in routes called");
      return CurrentSong.findOne();
    }
  });
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
