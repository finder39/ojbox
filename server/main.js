if (Meteor.isServer) {
  FastRender.route("player", function(params) {
    this.subscribe("currentSong");
    this.subscribe("playlist");
  });
}
