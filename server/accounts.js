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
    });
  } else {
    userId = user._id;
  }
  Meteor.users.update(userId, {
    $set: {"profile.boxname": loginRequest.boxname}
  });
  return {
    userId: userId
  };
});

