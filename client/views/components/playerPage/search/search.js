// to ensure that we're not polling the api too many consecutive times
var waitForSearchResults = false;

InstantResults = new Meteor.Collection(null);

var renderInstantResults = function(tracks) {
  // clear the collection
  InstantResults.remove({});
  _.each(tracks, function(value, key, list) {
    if (value.streamable) {
      InstantResults.insert({
        title: value.title
      });
    }
  });
  // allow searching api again
  waitForSearchResults = false;
}

var getInstantResults = function(event) {
  var str = $(".search form input").val();
  if (str && !waitForSearchResults) {
    waitForSearchResults = true;
    SC.get("/tracks", {
      limit: 10,
      q: str,
      duration: {from: 60000, to: 900000}
    }, function(tracks) {
      renderInstantResults(tracks);
    });
  }
}

Template.search.events({
  "keyup .search form input": _.debounce(getInstantResults, 250)
});

Template.search.helpers({
  "instantResults": function() {
    return InstantResults.find();
  }
});
