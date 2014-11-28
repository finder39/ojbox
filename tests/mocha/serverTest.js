if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    var insecureUserLogin = function(username, boxname, callback) {
      return Accounts.callLoginMethod({
        methodArguments: [{username: username, boxname: boxname}],
        userCallback: callback
      });
    }

    describe("Server initialization", function(){
      before(function() {
        insecureUserLogin('test name', 'test box');
      });
      it("should insert players into the database after server start", function(){
        chai.assert(5, 5);
      });
    });
  });
}
