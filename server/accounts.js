// using code from https://github.com/mizzao/meteor-accounts-testing
Accounts.registerLoginHandler(function(loginRequest) {
  var user, userId;
  if (!loginRequest.username) {
    return;
  }
  user = Meteor.users.findOne({
    username: loginRequest.username
  });
  if (!user) {
    userId = Accounts.insertUserDoc({}, {
      username: loginRequest.username
    });
  } else {
    userId = user._id;
  }
  return {
    userId: userId
  };
});

