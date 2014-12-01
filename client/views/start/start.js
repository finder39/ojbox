Template.start.events({
  "submit .start form": function(event) {
    event.preventDefault();

    var boxname = $(".box").val().trim();
    var regex = new RegExp(/^\w+$/);
    if (!regex.test(boxname)) {
      $("div.error-message")
      .text("User names and box names can only contain letters, numbers, and the underscore character ( _ ).")
      .fadeIn().delay(3000).fadeOut();
    }
    Router.go('/' + boxname);
  }
});
