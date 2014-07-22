Meteor.methods({
  checkSettingsPassword: function(password) {
    check(password, String);
    if (!Settings.findOne()) {
      return false;
    }
    if (password === Settings.findOne().password) {
      return true;
    } else {
      return false;
    }
  },
  updateSettingsPassword: function(newPass) {
    return Settings.upsert(
      {},
      {$set: {password: newPass}}
    );
  }
});
