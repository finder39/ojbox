// to ensure that we're not polling the api too many consecutive times
var waitForSearchResults = false;
// makes sure that search only happens on new strings, because
// keypresses happen on keys that don't matter
var oldQuery = "";

InstantResults = new Meteor.Collection(null);

var renderInstantResults = function(tracks, query) {
  // clear the collection
  InstantResults.remove({});
  _.each(tracks, function(value, key, list) {
    if (value.streamable) {
      InstantResults.insert({
        title: value.title
      });
    }
  });
  // highlight the search results
  $(".search-results ul").highlight(query.split());
  // allow searching api again
  waitForSearchResults = false;
}

var getInstantResults = function(event) {
  var query = $(".search form input").val().trim();
  if (query && !waitForSearchResults && query != oldQuery) {
    oldQuery = query;
    waitForSearchResults = true;
    SC.get("/tracks", {
      limit: 10,
      q: query,
      duration: {from: 60000, to: 900000}
    }, function(tracks) {
      renderInstantResults(tracks, query);
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
});
