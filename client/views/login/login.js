Template.login.events({
  "submit .login form": function(event) {
    event.preventDefault();

    // trim the beginning and end white space
    // replace all multiple spaces with just one space
    //var username = $(".name").val().trim();
    var boxname = $(".box").val().trim();
    var regex = new RegExp(/^\w+$/);
    //if (!regex.test(username) || !regex.test(boxname)) {
    if (!regex.test(boxname)) {
      $("div.error-message")
      .text("User names and box names can only contain letters, numbers, and the underscore character ( _ ).")
      .fadeIn().delay(3000).fadeOut();
    }
    //Meteor.insecureUserLogin(username, boxname);
    Router.go('/' + boxname);
  }
});
