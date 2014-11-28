if (Meteor.isServer) {
  FastRender.route("/:box/player", function(params) {
    this.subscribe("currentSong");
    this.subscribe("playlist");
  });
}
