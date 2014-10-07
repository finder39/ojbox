// max number of chat messages to show
var maxChats = 200;

Chat = new Meteor.Stream("chat");
ChatCollection = new Meteor.Collection(null);

var addChatMessage = function(message, username) {
  ChatCollection.insert({
    username: username,
    message: message,
    time: new Date()
  });
  if (!Session.equals("selectedTab", "chat")) {
    Session.set("missedChats", Session.get("missedChats") + 1);
  }
}

Chat.on("chat", function(message, username, boxname) {
  // only show the chats from the same box
  if (boxname === Meteor.user().profile.boxname) {
    addChatMessage(message, username);
  }
});

Template.chat.helpers({
  message: function() {
    return ChatCollection.find({}, {
      limit: maxChats,
      sort: [["time", "desc"], ["username", "asc"]]
    });
  },
});

Template.chatMessage.helpers({
  formattedTime: function() {
    return moment(this.time).format("H:mm");
  }
});

Template.chat.events({
  "submit .chat form": function(event) {
    event.preventDefault();

    var message = $(".chat form input");
    // don't do anything if the message is empty
    if (message.val()) {
      addChatMessage(message.val(), Meteor.user().username);
      Chat.emit("chat", message.val());
      message.val("");
    }
  }
});

