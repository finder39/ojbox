Router.map(function() {
  // this template will be returned for all routes
  this.route('*', {
    template: 'home',
    waitOn: function() {
      return [
        Meteor.subscribe("currentSong"),
        Meteor.subscribe("playlist")
      ];
    },
    fastRender: true,
  });
});
