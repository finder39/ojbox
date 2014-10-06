Router.map(function() {
  // single page app
  // this template will be returned for all routes
  // need to have more routes now
  this.route('player', {
    template: 'playerPage',
    waitOn: function() {
      return [
        Meteor.subscribe("settings"),
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    onBeforeAction: function() {
      if (!Meteor.userId()) {
        Router.go('login');
      }
    },
     //todo: change this later to use only the required fields, not all of them
    //data: function() {
      //console.log("data function in routes called");
      //return CurrentSong.findOne();
    //}
  });
  this.route('login', {
    template: 'login',
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
      if (Meteor.userId()) {
        Router.go('player');
      }
    },
  });
});
