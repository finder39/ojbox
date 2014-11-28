// using code from https://github.com/mizzao/meteor-accounts-testing
Accounts.registerLoginHandler(function(loginRequest) {
  var user, userId, username, boxname, box;
  if (!loginRequest.username) {
    return;
  }
  if (!loginRequest.boxname) {
    return;
  }
  // ignore case and white space
  username = new RegExp(loginRequest.username);
  user = Meteor.users.findOne({username: {$regex: username, $options: 'i'}});
  if (!user) {
    userId = Accounts.insertUserDoc({}, {
      username: loginRequest.username,
    });
  } else {
    userId = user._id;
  }
  // ignore case and white space
  boxname = new RegExp(loginRequest.boxname);
  box = Boxes.findOne({name: {$regex: boxname, $options: 'i'}});
  if (!box) {
    Boxes.insert({name: loginRequest.boxname});
    Meteor.users.update(userId, {
      $set: {"profile.boxname": loginRequest.boxname}
    });
  } else {
    Meteor.users.update(userId, {
      $set: {"profile.boxname": box.name}
    });
  }
  return {
    userId: userId
  };
});

