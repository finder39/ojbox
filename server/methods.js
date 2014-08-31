Meteor.methods({
  getOnlineUserCount: function() {
    return Meteor.users.find({"status.online": true}).count();
  }
});
