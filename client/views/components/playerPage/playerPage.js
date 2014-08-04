Template.topBar.events({
  "click .tab-playlist": function(event) {
    var tab = $(".tab-playlist");
    // if not selected
    if (!tab.hasClass("selected")) {
      // unselect the rest
      $(".tab.selected").removeClass("selected");
      // select it
      tab.addClass("selected");
    }
    $(".chat").hide();
    $(".search").hide();
    $(".playlist").show();
  },
  "click .tab-chat": function(event) {
    var tab = $(".tab-chat");
    // if not selected
    if (!tab.hasClass("selected")) {
      // unselect the rest
      $(".tab.selected").removeClass("selected");
      // select it
      tab.addClass("selected");
    }
    $(".playlist").hide();
    $(".search").hide();
    $(".chat").show();
  },
  "click .tab-search": function(event) {
    var tab = $(".tab-search");
    // if not selected
    if (!tab.hasClass("selected")) {
      // unselect the rest
      $(".tab.selected").removeClass("selected");
      // select it
      tab.addClass("selected");
    }
    $(".chat").hide();
    $(".playlist").hide();
    $(".search").show();
  },
});
