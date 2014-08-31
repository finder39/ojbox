Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    var username = $(".login form input").val();
    Meteor.insecureUserLogin(username);
  }
});
