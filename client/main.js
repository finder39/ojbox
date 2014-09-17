Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

// using code from https://github.com/mizzao/meteor-accounts-testing
Meteor.insecureUserLogin = function(username, callback) {
  return Accounts.callLoginMethod({
    methodArguments: [{username: username}],
    userCallback: callback
  });
};

var soundManagerOptions = {
  autoLoad: true,
  autoPlay: false,
  stream: true,
  //onload: function() {
    //var startingPosition;
    //Tracker.nonreactive(function() {
      //OJPlayer.loaded(true);
      //startingPosition = OJPlayer.getStartingPosition();
    //});
    //currentSound.setPosition(startingPosition);
    //currentSound.play();
    //currentSound.pause();
    //Session.set("loading", false);
  //},
  //whileplaying: function() {
    //updateSeekBarDisplay(this.position / this.duration);
    //// update the position
    //if (okToUpdate) {
      //// make sure we don't update too often
      //okToUpdate = false;
      //var current;
      //Tracker.nonreactive(function() {
        //current = CurrentSong.findOne();
      //});
      ////CurrentSong.update(current._id, {
        ////$set: {
          ////position: this.position,
        ////}
      ////});
      //// set a timeout to be able to update again in a few seconds
      //Meteor.setTimeout(function() {
        //okToUpdate = true;
      //}, seekBarUpdateInterval);
    //}
  //},
  //onfinish: function() {
    // destroy the song and remove it from CurrentSong
    //this.destruct();
    //OJPlayer.nextSong();
    //updateSeekBarDisplay(0);
  //}
}

Meteor.startup(function() {
  Session.setDefault("selectedTab", "playlist");
  Session.setDefault("missedChats", 0);
  Session.setDefault("missedPlaylist", 0);
  // initialize soundcloud api
  console.log("initializing soundcloud");
  SC.initialize({
    client_id: "dab79335daff5c0c3b601594af49d985"
  });
});
