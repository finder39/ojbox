// using code from https://github.com/mizzao/meteor-accounts-testing
Meteor.insecureUserLogin = function(username, callback) {
  return Accounts.callLoginMethod({
    methodArguments: [{username: username}],
    userCallback: callback
  });
};

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
