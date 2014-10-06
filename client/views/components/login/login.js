Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    var username = $(".name").val();
    var boxname = $(".box").val();
    Meteor.insecureUserLogin(username, boxname);
  }
});
