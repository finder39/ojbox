Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    var username = $(".login form input").val();
    console.log("logging in " + userName + "...");
    Meteor.insecureUserLogin(username);
  }
});
