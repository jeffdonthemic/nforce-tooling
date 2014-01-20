var nforce = require("nforce");
var tooling = require('../')(nforce);
var should = require("should");

var sfuser = '';
var sfpass = '';
var oauth;

var org = nforce.createConnection({
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single',
  plugins: ['tooling']
});

describe('tooling plugin', function() {  

  describe('#createContainer()', function(){
    it('should still be pending')
  })    

  describe('#getContainer()', function(){
    it('should still be pending')
  })  

  describe('#addContainerArtifact()', function(){
    it('should still be pending')
  })  

  describe('#deleteContainer()', function(){
    it('should still be pending')
  })    

  describe('#deployContainer()', function(){
    it('should still be pending')
  })  

  describe('#getContainerDeployStatus()', function(){
    it('should still be pending')
  })  

  describe('#getCustomField()', function(){
    it('should still be pending')
  })    

  describe('#getCustomField()', function(){
    it('should still be pending')
  })  

  before(function(done){
    org.authenticate({ username: sfuser, password: sfpass}, function(err, resp){
      if (!err) oauth = resp;
      if (err) console.log('Error connecting to Salesforce: ' + err.message); 
      done();
    }); 
  });    

});