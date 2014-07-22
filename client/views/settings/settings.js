Template.settings.helpers({
  authorized: function() {
    var setting = Settings.findOne();
    // if there are no settings, authorize to go to setup page
    // also authorize if password is empty
    // (for initial set up)
    if (!setting) {
      console.log("no settings found, authorized");
      Session.set("emptyPassword", true);
      Session.set("authorized", true);
    }
    // check for empty password
    Meteor.call("checkSettingsPassword", "", function(err, emptyPassword) {
      if (emptyPassword) {
        Session.set("emptyPassword", true);
        Session.set("authorized", true);
      }
    });
    if (Session.equals("authorized", true)) {
      return true;
    } else {
      return false;
    }
  }
});
Template.settingsModal.events = {
  "submit .modal-form": function(event) {
    event.preventDefault();
    console.log("form submitted");

    var password = $("input[type=password]").val();
    Meteor.call("checkSettingsPassword", password, function(err, correctPassword) {
      if (correctPassword) {
        console.log("correct!");
        Session.set("authorized", true);
        Session.set("password")
      } else {
        console.log("incorrect!");
        // bump up password tries if failed
        var passwordTries = Session.get("passwordTries");
        if (passwordTries < 3) {
          Session.set("passwordTries", passwordTries + 1);
        }
        var input = $(".modal .modal-inner form input");
        var pErr = $(".modal .modal-inner .error");
        var errorText = "Incorrect password.";
        // highlight the text in the password box
        input.select();
        // change the password box to be red
        input.addClass("error-border");
        // set an error message
        pErr.fadeIn();
        // set a timeout to turn those things back
        Meteor.setTimeout(function() {
          input.removeClass("error-border");
          pErr.fadeOut();
        }, 5000);
      }
    });
  },
  "click .forgot-password": function(event) {
    event.preventDefault();
    $('.reset-password-form').slideDown(300);
  },
  "submit .reset-password-form": function(event) {
    event.preventDefault();
    Meteor.call("updateSettingsPassword", "", function(err, result) {
      console.log("password reset!");
      Session.set("emptyPassword", true);
      $(".reset-password-form button").html("Reset!")
      Meteor.setTimeout(function() {
        Session.set("authorized", true);
      }, 1000);
    });
  }
}

Template.settingsModal.helpers({
  "forgotPassword": function() {
    // display a reset link if password fails is more than 3
    if(Session.equals("passwordTries", 3)) {
      return "Forgot your password? Click to reset it.";
    }
    return "";
  }
});

Template.settingsForm.helpers({
  passwordText: function() {
    if (Session.equals("emptyPassword", true)) {
      return "Set up a password";
    } else {
      return "Change password";
    }
  }
});

Template.settingsForm.events({
  "click #changePassword": function(event) {
    event.preventDefault();
    $("#changePassword").slideUp(300);
    $(".change-section").slideDown(600);
    $(".change-section input").focus();
  },
  "click #cancelPassword": function(event) {
    event.preventDefault();
    $(".settings-form form input").val("");
    $(".change-section").slideUp(300);
    $("#changePassword").slideDown(600);
  },
  "submit .settings-form form": function(event) {
    event.preventDefault();
    var newpass = $(".settings-form form input").val();
    Meteor.call("updateSettingsPassword", newpass, function(err, result) {
      if (newpass) {
        Session.set("emptyPassword", false);
      } else {
        Session.set("emptyPassword", true);
      }
      $(".settings-form form input").val("");
      $(".change-section").slideUp(300);
      $("#changePassword").slideDown(600);
    });
  }
})
