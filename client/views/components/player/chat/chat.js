Chat = new Meteor.Stream("chat");
ChatCollection = new Meteor.Collection(null);

Chat.on("chat", function(message, username) {
  ChatCollection.insert({
    username: username,
    message: message,
    time: moment().format("H:mm")
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
    // don't do anything if the message is empty
    if (message.val()) {
      ChatCollection.insert({
        username: user.username,
        message: message.val(),
        time: moment().format("H:mm")
      });
      Chat.emit("chat", message.val());
      message.val("");
    }
  }
});

Template.chatMessage.helpers({
  "relativeTime": function() {
    return moment(this.time).fromNow();
  }
})
