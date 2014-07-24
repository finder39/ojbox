Chat = new Meteor.Stream("chat");
ChatCollection = new Meteor.Collection(null);

Chat.on("chat", function(message, username) {
  console.log(message + " " + username);
  ChatCollection.insert({
    username: username,
    message: message
  });
});

Template.chat.helpers({
  "message": function() {
    return ChatCollection.find({}, {limit: 100});
  }
});

Template.chat.events({
  "submit .chat form": function(event) {
    event.preventDefault();

    var user = Meteor.users.findOne(Meteor.userId());
    var message = $(".chat form input");
  ChatCollection.insert({
    username: user.username,
    message: message.val()
  });
    Chat.emit("chat", message.val());
    message.val("");
  }
});
