Boxes = new Mongo.Collection("boxes");

// don't allow changes to the box from the client (at least not yet)
// the only attribute of a box currently is it's name, which should
// never be modified
Boxes.allow({
  'insert': function(userId, doc) {
    return false;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return false;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

