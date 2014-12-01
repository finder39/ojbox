// None of the Iron Router 1.0 documents seem accurate. Most of the things in
// there don't seem to work.
Router.route('login', {
  //onBeforeAction: function() {
    //if (Meteor.userId()) {
      //this.redirect('/' + Meteor.user().profile.boxname);
    //}
  //},
});
Router.route(':box', {
  name: 'player',
  template: 'playerPage',
  waitOn: function() {
    return [
      Meteor.subscribe("currentSong"),
      Meteor.subscribe("playlist"),
    ];
  },
  //onBeforeAction: function() {
    //if (!Meteor.userId()) {
      //this.redirect('login');
    //}
    //if (Meteor.user().profile.boxname !== this.params.boxname) {
      //this.redirect('/' + Meteor.user().profile.boxname);
    //}
  //},
  fastRender: true,
});
Router.route('start');
Router.route('*', {
  template: 'home',
  name: 'home',
});
