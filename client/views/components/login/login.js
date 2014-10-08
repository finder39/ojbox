Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    var username = $(".name").val().toLowerCase();
    var boxname = $(".box").val().toLowerCase();
    Meteor.insecureUserLogin(username, boxname);
  }
});
