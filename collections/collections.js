Settings = new Meteor.Collection("settings");
Settings.allow({
  'insert': function(userId, doc) {
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});
