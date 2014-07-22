Meteor.methods({
  checkSettingsPassword: function(password) {
    check(password, String);
    if (password === Settings.findOne().password) {
      return true;
    } else {
      return false;
    }
  },
  updateSettingsPassword: function(newPass) {
    return Settings.update(
      {},
      {$set: {password: newPass}}
    );
  }
});
