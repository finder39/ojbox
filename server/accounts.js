// using code from https://github.com/mizzao/meteor-accounts-testing
Accounts.registerLoginHandler(function(loginRequest) {
  var user, userId;
  if (!loginRequest.username) {
    return;
  }
  if (!loginRequest.boxname) {
    return;
  }
  // case insensitive regular expression object for user name
  var username = new RegExp(loginRequest.username, 'i');
  user = Meteor.users.findOne({username: username});
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

