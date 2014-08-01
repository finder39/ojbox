// makes sure that search only happens on new strings, because
// keypresses happen on keys that don't matter
var oldQuery = "";

// limit results and instant results
var maxResults = 20;

InstantResults = new Meteor.Collection(null);

var processSearchResults = function(tracks, query) {
  // clear the results
  InstantResults.remove({});
  var count = 0;
  _.each(tracks, function(value, key, list) {
    // todo: put in addedBy, addedAt
    // and also update the user collection, incrementing playlistTime with
    // the duration of the song added
    if (value.streamable) {
      // instant results
      InstantResults.insert({
        title: value.title,
        uri: value.uri.substring(value.uri.indexOf("/tracks"))
      });
    }
  });
  // highlight the instant search results
  $(".search-results tbody").highlight(query.split(" "));
  // allow searching api again
}

var getInstantResults = function(event) {
  var query = $(".search input[type=search]").val().trim();
  if (query && query != oldQuery) {
    oldQuery = query;
    SC.get("/tracks", {
      limit: maxResults,
      q: query,
      // there is a bug in the soundcloud api where the filter option
      // is ignored when there is a query option. i'm including it
      // anyway so when it's fixed it'll work
      filter: {streamable: true},
      duration: {from: 60000, to: 900000}
    }, function(tracks) {
      processSearchResults(tracks, query);
    });
  }
}

Template.search.events({
  // make sure the api call only fires once the user is done typing
  "keyup .search input[type=search]": _.debounce(getInstantResults, 250),
  "click .add-to-playlist": function(event) {
    // todo: only add to playlist if it's not in playlist already.
    // if it is in the playlist, then vote it up once
    // also, check who is adding it so they don't vote it up
    // by adding it a bunch of times
    // todo: put in order, upvotes, downvotes
    // this means figuring out where to insert the song into the list
    this.addedByUsername = Meteor.users.findOne(Meteor.userId, {
      fields: {username: 1}
    });
    this.addedByUserId = Meteor.userId;
    this.addedAt = new Date();
    Playlist.insert(this);
  }
});

Template.search.helpers({
  instantResults: function() {
    return InstantResults.find();
  },
});
