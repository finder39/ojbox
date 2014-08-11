// limit results and instant results
var maxResults = 20;
// minimum song length
// 120000 = 2 minutes
var minSongLength = 120000;
// maximum song length
// 600000 = 10 minutes
var maxSongLength = 600000;

// collection for results. only a local collection
SearchResults = new Meteor.Collection(null);
// to track adds to the playlist
PlaylistTracker = new Meteor.Stream("playlistTracker");
PlaylistTracker.on("songAdded", function() {
  if (!Session.equals("selectedTab", "playlist")) {
    Session.set("missedPlaylist", Session.get("missedPlaylist") + 1);
  }
});

var processSearchResults = function(tracks, query) {
  // clear the results
  SearchResults.remove({});
  if (_.size(tracks)) {
    $(".results-message").show();
  } else {
    $(".no-results").show();
  }
  _.each(tracks, function(value, key, list) {
    if (value.streamable) {
      if (Playlist.find({id: value.id}).count()) {
        value.inPlaylist = true;
      } else {
        value.inPlaylist = false;
      }
      SearchResults.insert(value);
    }
  });
  // highlight the instant search results
  $(".search-results tbody").highlight(query.split(" "));
}

var getSearchResults = function(event) {
  var query = $(".search input[type=search]").val().trim();
  if (query) {
    $(".query").html(query);
    SC.get("/tracks", {
      limit: maxResults,
      q: query,
      // there is a bug in the soundcloud api where the filter option
      // is ignored when there is a query option. i'm including it
      // anyway so when it's fixed it'll work
      filter: {streamable: true},
      duration: {from: minSongLength, to: maxSongLength}
    }, function(tracks) {
      processSearchResults(tracks, query);
    });
  }
}

Template.search.events({
  "submit .search form": function(event) {
    $(".results-message").hide();
    $(".no-results").hide();
    event.preventDefault();
    getSearchResults(event);
  },
  "click .add-to-playlist, touchstart .add-to-Playlist": function(event) {
    event.preventDefault();
    OJPlayer.addSongToPlaylist(this);
    if (!Session.equals("selectedTab", "playlist")) {
      Session.set("missedPlaylist", Session.get("missedPlaylist") + 1);
    }
    PlaylistTracker.emit("songAdded");
    $(event.currentTarget).parent().addClass("in-playlist");
    $(".added").fadeIn("fast").delay(1000).fadeOut("slow");
  }
});

Template.search.helpers({
  searchResults: function() {
    return SearchResults.find({inPlaylist: false});
  },
});

Template.searchResult.helpers({
  inPlaylist: function() {
    if (Playlist.find({id: this.id}).count()) {
      if (!this.inPlaylist) {
        SearchResults.update(this._id, {
          $set: {inPlaylist: true}
        });
      }
      return "in-playlist";
    }
    if (this.inPlaylist) {
      SearchResults.update(this._id, {
        $set: {inPlaylist: false}
      });
    }
    return "";
  },
});
