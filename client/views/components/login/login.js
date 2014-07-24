Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    var userName = $(".login form input").val();
    console.log("logging in " + userName + "...");
    Meteor.insecureUserLogin(userName);
  }
});
