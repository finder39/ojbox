// using code from https://github.com/mizzao/meteor-accounts-testing
Accounts.registerLoginHandler(function(loginRequest) {
  var user, userId;
  if (!loginRequest.username) {
    return;
  }
  if (!loginRequest.boxname) {
    return;
  }
  user = Meteor.users.findOne({
    username: loginRequest.username
  });
  if (!user) {
    userId = Accounts.insertUserDoc({}, {
      username: loginRequest.username,
      boxname: loginRequest.boxname,
    });
  } else {
    userId = user._id;
  }
  return {
    userId: userId
  };
});

