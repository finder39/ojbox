if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    //var selectGraceHopper = function(){
      //Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
    //};

    //var unselectPlayer = function(){
      //Session.set("selected_player", null);
      //Meteor.flush();
    //}

    //describe("Select Grace Hopper", function(){
      //before(function(done){
        //Meteor.autorun(function(){
          //var grace = Players.findOne({name: "Grace Hopper"});
          //if (grace){
            //selectGraceHopper();
            //done();
          //}
        //})
      //});

      //it("should show Grace the inside div class='name' (above the give points button)", function(){
        //Meteor.flush();
        //chai.assert.equal($("div.details > div.name").html(), "Grace Hopper");
      //});


      //it("should highlight Grace's name", function(){
        //Meteor.flush();
        //var parentDiv = $("span.name:contains(Grace Hopper)").parent();
        //chai.assert(parentDiv.hasClass("selected"));
      //});
    //});

    //describe("Point Assignment", function(){

      //it("should give a player 5 points when they are selected and the button is pressed", function(){
        //var graceInitialPoints = Players.findOne({name: "Grace Hopper"}).score;
        //$("input:button").click();
        //chai.assert.equal(graceInitialPoints + 5, Players.findOne({name: "Grace Hopper"}).score);
      //});
    //});

    //var insecureUserLogin = function(username, boxname, callback) {
      //return Accounts.callLoginMethod({
        //methodArguments: [{username: username, boxname: boxname}],
        //userCallback: callback
      //});
    //};
    describe("User login", function(){
      //it("should result in a list where the first player as many or more points than the second player", function(){
        //var players = Template.leaderboard.players().fetch();
        //chai.assert(players[0].score >= players[1].score);
      //});
      //before(function() {
        //insecureUserLogin('test user', 'test box');
      //});
      it("should respect equality", function() {
        chai.assert(5, 5);
      });
    })
  });
}

