var nforce = require("nforce");
var tooling = require('../')(nforce, 'toolingMultiMode');
var should = require("should");
var config = require("./config");

var oauth;

// run tests in multi mode
var org = nforce.createConnection({
  clientId: config.connection.clientId,
  clientSecret: config.connection.clientSecret,
  redirectUri: config.connection.redirectUri,
  mode: 'multi',
  plugins: ['toolingMultiMode']
});

describe('pluginMulti', function() {   

  describe('#query()', function(){
    it('should return an array of 1 record', function(done){
      var q = 'SELECT Id, Name FROM ApexClass Limit 1';
      org.toolingMultiMode.query({q: q, oauth: oauth}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        // if there are no apex classes in the org, give a warning
        if (resp.size == 0) console.log('Warning! There are no Apex classes in the Org. Tests will fail.');
        resp.size.should.eql(1);
        resp.records.should.be.instanceof(Array);      
        done();
      })
    })
  })    

  describe('#getDescribe()', function(){
    it('should return a metadata object with a matching name', function(done){
      org.toolingMultiMode.getDescribe({type: 'TraceFlag', oauth: oauth}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.name.should.eql('TraceFlag');
        done();
      })
    })
  })

  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
      if (!err) oauth = resp;
      if (err) console.log('Error connecting to Salesforce: ' + err.message); 
      done();
    }); 
  });    
 
});