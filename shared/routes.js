Router.map(function() {
  // single page app
  // this template will be returned for all routes
  this.route('app', {
    path: '*',
    waitOn: function() {
      Meteor.subscribe("settings");
      Meteor.subscribe("playlist");
      return Meteor.subscribe("currentSong");
    },
    onBeforeAction: function() {
      Session.set("playerIsDisabled", true);
      Session.set("soundLoaded", false);
      if (this.ready()) {
        // pause the current song if it was playing
        if (CurrentSong.find().count() !== 0) {
          console.log("making sure the current song starts off paused");
          CurrentSong.update(CurrentSong.findOne()._id, {
            $set: {paused: true}
          });
        } else {
          // pull the top song off the playlist if possible
          OJPlayer.nextSong();
        }
      }
    }
  });
});
