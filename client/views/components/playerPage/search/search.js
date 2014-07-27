// to ensure that we're not polling the api too many consecutive times
var waitForSearchResults = false;
// makes sure that search only happens on new strings, because
// keypresses happen on keys that don't matter
var oldQuery = "";

// limit results and instant results
var maxResults = 20;
var maxInstantResults = 5;

InstantResults = new Meteor.Collection(null);
SearchResults = new Meteor.Collection(null);

var processSearchResults = function(tracks, query) {
  // clear the results
  SearchResults.remove({});
  InstantResults.remove({});
  var count = 0;
  _.each(tracks, function(value, key, list) {
    if (value.streamable) {
      count++;
      // all results
        SearchResults.insert({
          title: value.title,
          uri: value.uri.substring(value.uri.indexOf("tracks"))
        });
      // instant results
      if (count < maxInstantResults) {
        InstantResults.insert({
          title: value.title,
          uri: value.uri.substring(value.uri.indexOf("tracks"))
        });
      }
    }
  });
  // highlight the instant search results
  $(".search-results ul").highlight(query.split(" "));
  // allow searching api again
  waitForSearchResults = false;
}

var getInstantResults = function(event) {
  var query = $(".search form input").val().trim();
  if (query && !waitForSearchResults && query != oldQuery) {
    oldQuery = query;
    waitForSearchResults = true;
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
  // make sure the api call only fires once the user is dnoe typing
  "keyup .search form input": _.debounce(getInstantResults, 250)
});

Template.search.helpers({
  instantResults: function() {
    return InstantResults.find();
  },
  searchResults: function() {
    return SearchResults.find();
  }
});
