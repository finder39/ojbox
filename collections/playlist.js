Playlist = new Mongo.Collection("playlist");

Playlist.allow({
  'insert': function(userId, doc) {
    // if it's already in the playlist, don't allow
    if (Playlist.findOne({stream_url: doc.stream_url, boxname: doc.boxname})) {
      return false;
    }
    return Meteor.user().profile.boxname === doc.boxname;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return Meteor.user().profile.boxname === doc.boxname;
  },
  'remove': function(userId, doc) {
    // only allowed to remove the songs you added
    return doc.addedByUserId === userId;
  }
});
