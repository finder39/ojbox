Router.map(function() {
  // single page app
  // this template will be returned for all routes
  // need to have more routes now
  this.route('/player', {
    template: 'playerPage',
    waitOn: function() {
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    onBeforeAction: function() {
      if (!Meteor.user()) {
        Router.go('/');
      }
    },
    // todo: change this later to use only the required fields, not all of them
    //data: function() {
      //console.log("data function in routes called");
      //return CurrentSong.findOne();
    //}
  });
  this.route('*', {
    template: 'home',
    waitOn: function() {
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    onBeforeAction: function() {
      if (Meteor.user()) {
        Router.go('/player');
      }
    },
  });
});
