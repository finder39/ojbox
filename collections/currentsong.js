CurrentSong = new Mongo.Collection("currentSong");

CurrentSong.allow({
  'insert': function(userId, doc) {
    return Meteor.user().profile.boxname === doc.boxname;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return Meteor.user().profile.boxname === doc.boxname;
  },
  'remove': function(userId, doc) {
    return Meteor.user().profile.boxname === doc.boxname;
  }
});
