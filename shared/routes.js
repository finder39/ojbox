Router.configure({
  notFoundTemplate: 'home'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('player', {
    path: '/player'
  });
});
