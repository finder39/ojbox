Template.topBar.events({
  "click .search-icon": function(event) {
    // flip the search icon when the search panel is open
    var iconDiv = $(".search-icon i");
    $(".search").toggleClass("open");
    $(".player-page").toggleClass("search-open");
    iconDiv.toggleClass("flipped");
    iconDiv.toggleClass("not-flipped");
  },
  "click .tab": function(event) {
    var tab = $(event.currentTarget);
    // if not selected
    if (!tab.hasClass("selected")) {
      // unselect the rest
      $(".tab.selected").removeClass("selected");
      // select it
      tab.addClass("selected");
    }
  }
});
