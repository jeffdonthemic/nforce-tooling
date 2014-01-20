var nforce = require("nforce");
var tooling = require('../')(nforce);
var should = require("should");
var config = require("./config");

var oauth;

var org = nforce.createConnection({
  clientId: config.connection.clientId,
  clientSecret: config.connection.clientSecret,
  redirectUri: config.connection.redirectUri,
  mode: 'single',
  plugins: ['tooling']
});

describe('tooling plugin', function() {  

  describe('#insert()', function(){
    it('should create a new MetadataContainer record successfully', function(done){
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
    it('should update MetadataContainer record successfully', function(done){
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestUpdateContainer'}, oauth: oauth}, function(err, resp) {
        // update the record we just inserted
        var containerId = resp.id;
        org.tooling.update({type: 'MetadataContainer', id: containerId, object: { name: 'TestUpdateContainerModified' }, oauth: oauth}, function(err, resp) {
          resp.success.should.eql(true);  
          // delete the record we just inserted
          org.tooling.delete({type: 'MetadataContainer', id: containerId, oauth: oauth}, function(err, resp) {
            if (err) console.log('Could not delete MetadataContainer ' + containerId + ': ' + err.message); 
            done();
          }); 
        });
      });
    })
  })   

  describe('#delete()', function(){
    it('should a MetadataContainer record successfully', function(done){
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
    it('should return an array of 1 record', function(done){
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
    it('should return the requested record', function(done){
      var q = 'SELECT Id, Name FROM ApexClass Limit 1';
      org.tooling.query({q: q, oauth: oauth}, function(err, resp) {
        var apexClassId = resp.records[0].Id;
        org.tooling.getRecord({id: apexClassId, type: 'ApexClass', oauth: oauth}, function(err, resp) {  
          resp.Id.should.eql(apexClassId);
          done();
        });
      })      
    })
  })  

  describe('#getCustomField()', function(){
    if (config.records.custsomFieldId) {
      it('should return an object with an attribute type of CustomField', function(done){
        org.tooling.getCustomField({id: config.records.custsomFieldId, oauth: oauth}, function(err, resp) {
          resp.attributes.type.should.eql('CustomField');
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of a custom field from a custom object into config.js')
    }    
  }) 

  describe('#getApexLog()', function(){
    if (config.records.apexLogId) {
      it('should return the apex log info', function(done){
        org.tooling.getApexLog({id: config.records.apexLogId, oauth: oauth}, function(err, resp) {
          resp.should.be.ok
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of Apex Log file into config.js')
    }    
  })   

  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
      if (!err) oauth = resp;
      if (err) console.log('Error connecting to Salesforce: ' + err.message); 
      done();
    }); 
  });    
 
});