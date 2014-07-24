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
