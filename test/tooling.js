var nforce = require("nforce");
var tooling = require('../')(nforce);
var should = require("should");

var sfuser = 'df13@jeffdouglas.com';
var sfpass = '!dreamforce13sIx3nNOJDnp5au74JWeEMyUk9';
var oauth;

var org = nforce.createConnection({
  clientId: '3MVG9A2kN3Bn17ht1YQvQ6nm.jFel8rlyJZmshbAk1q2jOWva9KnNpzRoTR5n2LxulHbXMm0UucBJiOk_Rx7b',
  clientSecret: '4527253748424741492',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single',
  plugins: ['tooling']
});

describe('tooling plugin', function() {  
  this.timeout(10000);

  describe('#insert()', function(){
    it('should create a new MetadataContainer record successfully', function(done){
      this.timeout(5000);
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestInsertContainer'}, oauth: oauth}, function(err, resp) {
        resp.success.should.eql(true);  
        // delete the record we just inserted
        org.tooling.delete({type: 'MetadataContainer', id: resp.id, oauth: oauth}, function(err, resp) {
          if (err) console.log('Could not delete MetadataContainer ' + resp.id + ': ' + err.message); 
          done();
        }); 
      });
    })
  })    

  describe('#update()', function(){
    it.only('should a update MetadataContainer record successfully', function(done){
      this.timeout(5000);
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestDeleteContainer'}, oauth: oauth}, function(err, resp) {
        // delete the record we just inserted
        org.tooling.delete({type: 'MetadataContainer', id: resp.id, oauth: oauth}, function(err, resp) {
          resp.success.should.eql(true);  
          done();
        }); 
      });
    })
  })   

  describe('#delete()', function(){
    it('should a MetadataContainer record successfully', function(done){
      this.timeout(5000);
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestDeleteContainer'}, oauth: oauth}, function(err, resp) {
        // delete the record we just inserted
        org.tooling.delete({type: 'MetadataContainer', id: resp.id, oauth: oauth}, function(err, resp) {
          resp.success.should.eql(true);  
          done();
        }); 
      });
    })
  })      

  describe('#query()', function(){
    it('should return an array of at least 1 record', function(done){
      var q = 'SELECT Id, Name FROM ApexClass Limit 1';
      org.tooling.query({q: q, oauth: oauth}, function(err, resp) {
        resp.size.should.eql(1);
        resp.records.should.be.instanceof(Array);      
        done();
      })
    })
  })    

  describe('#executeAnonymous()', function(){
    it('should return an array of at least 1 record', function(done){
      var code = "System.debug('hello world');";
      org.tooling.executeAnonymous({code: code, oauth: oauth}, function(err, resp) {
        resp.compiled.should.eql(true);
        resp.success.should.eql(true);
        done();
      })
    })
  })  

  describe('#getApexLog()', function(){
    it('should still be pending')
  })   

  describe('#getDescribe()', function(){
    it('should return an metadata object with a matching name', function(done){
      org.tooling.getDescribe({type: 'TraceFlag', oauth: oauth}, function(err, resp) {
        resp.name.should.eql('TraceFlag');
        done();
      })
    })
  })

  describe('#getOject()', function(){
    it('should return an object with a matching name', function(done){
      org.tooling.getObject({type: 'TraceFlag', oauth: oauth}, function(err, resp) {
        resp.objectDescribe.name.should.eql('TraceFlag');
        done();
      })
    })
  })

  describe('#getOjects()', function(){
    it('should return a array of objects', function(done){
      org.tooling.getObjects({oauth: oauth}, function(err, resp) {
        resp.sobjects.should.be.instanceof(Array)
        done();
      })
    })
  })

  describe('#getRecord()', function(){
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