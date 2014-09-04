var nforce = require("nforce");
var tooling = require('../')(nforce);
var should = require("should");
var config = require("./config");

var org = nforce.createConnection({
  clientId: config.connection.clientId,
  clientSecret: config.connection.clientSecret,
  redirectUri: config.connection.redirectUri,
  mode: 'single',
  plugins: ['tooling']
});

describe('plugin', function() {  

  describe('#insert()', function(){
    it('should create a new MetadataContainer record successfully', function(done){
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestInsertContainer'}}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.success.should.eql(true);  
        // delete the record we just inserted
        org.tooling.delete({type: 'MetadataContainer', id: resp.id}, function(err, resp) {
          if (err) console.log('Could not delete MetadataContainer ' + resp.id + ': ' + err.message); 
          done();
        }); 
      });
    })
  })    

  describe('#update()', function(){
    it('should update a MetadataContainer record successfully', function(done){
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestUpdateContainer'}}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        // update the record we just inserted
        var containerId = resp.id;
        org.tooling.update({type: 'MetadataContainer', id: containerId, object: { name: 'TestUpdateContainerModified' }}, function(err, resp) {
          resp.success.should.eql(true);  
          // delete the record we just inserted
          org.tooling.delete({type: 'MetadataContainer', id: containerId}, function(err, resp) {
            if (err) console.log('Could not delete MetadataContainer ' + containerId + ': ' + err.message); 
            done();
          }); 
        });
      });
    })
  })   

  describe('#delete()', function(){
    it('should delete a MetadataContainer record successfully', function(done){
      org.tooling.insert({type: 'MetadataContainer', object: {name: 'TestDeleteContainer'}}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        // delete the record we just inserted
        org.tooling.delete({type: 'MetadataContainer', id: resp.id}, function(err, resp) {
          resp.success.should.eql(true);  
          done();
        }); 
      });
    })
  })      

  describe('#query()', function(){
    it('should return an array of 1 record', function(done){
      var q = 'SELECT Id, Name FROM ApexClass Limit 1';
      org.tooling.query({q: q}, function(err, resp) {
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

  describe('#executeAnonymous() success', function(){
    it('should return the results of a successful execAnon successfully', function(done){
      var code = "System.debug('hello world');";
      org.tooling.executeAnonymous({code: code}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.compiled.should.eql(true);
        resp.success.should.eql(true);
        done();
      })
    })
  })  

  describe('#executeAnonymous() failure', function(){
    it('should return the results of a failed execAnon successfully', function(done){
      var code = "BAD CODE";
      org.tooling.executeAnonymous({code: code}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.compiled.should.eql(false);
        resp.success.should.eql(false);
        resp.compileProblem.should.not.be.null;
        done();
      })
    })
  })    

  describe('#getDescribe()', function(){
    it('should return a metadata object with a matching name', function(done){
      org.tooling.getDescribe({type: 'TraceFlag'}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.name.should.eql('TraceFlag');
        done();
      })
    })
  })

  describe('#getOject()', function(){
    it('should return an object with a matching name', function(done){
      org.tooling.getObject({type: 'TraceFlag'}, function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.objectDescribe.name.should.eql('TraceFlag');
        done();
      })
    })
  })

  describe('#getOjects()', function(){
    it('should return an array of objects', function(done){
      org.tooling.getObjects(function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp);
        resp.sobjects.should.be.instanceof(Array);
        done();
      })
    })
  })

  describe('#getRecord()', function(){
    it('should return the requested record', function(done){
      var q = 'SELECT Id, Name FROM ApexClass Limit 1';
      org.tooling.query({q: q}, function(err, resp) {
        // if there are no apex classes in the org, give a warning
        if (resp.size == 0) console.log('Warning! There are no Apex classes in the Org. Tests will fail.');
        var apexClassId = resp.records[0].Id;
        org.tooling.getRecord({id: apexClassId, type: 'ApexClass'}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.Id.should.eql(apexClassId);
          done();
        });
      })      
    })
  })  

  describe('#getCustomField()', function(){
    if (config.records.custsomFieldId) {
      it('should return an object with an attribute type of CustomField', function(done){
        org.tooling.getCustomField({id: config.records.custsomFieldId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
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
        org.tooling.getApexLog({id: config.records.apexLogId}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.should.be.ok
          done();
        });
      })
    } else {
      it('should not test successfully. Please enter the ID of Apex Log file into config.js')
    }    
  })   

  describe('#apexOrgWideCoverage()', function(){
    it('should return a number between 0 and 100', function(done){
      org.tooling.getApexOrgWideCoverage(function(err, resp) {
        if (err) console.log(err);
        if (config.debug) console.log(resp); 
        resp.should.be.within(0, 100);   
        done();
      })
    })
  })  

  describe('#getApexClassOrTriggerCoverage()', function(){
    if (config.records.apexClassOrTriggerName) {
      it('should return the propert test coverage', function(done){
        org.tooling.getApexClassOrTriggerCoverage({name: config.records.apexClassOrTriggerName}, function(err, resp) {
          if (err) console.log(err);
          if (config.debug) console.log(resp);
          resp.ApexClassOrTrigger.Name.should.eql(config.records.apexClassOrTriggerName);
          resp.Coverage.coveredLines.should.be.instanceof(Array);
          resp.Coverage.uncoveredLines.should.be.instanceof(Array);
          resp.PercentCovered.should.be.instanceof(Number);
          resp.NumLinesCovered.should.be.instanceof(Number);
          resp.NumLinesUncovered.should.be.instanceof(Number);
          done();
        })
      })
    } else {
      it('should not test successfully. Please enter the name of the Apex class or Trigger into config.js')
    }        
  })   

  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
      if (err) console.log('Error connecting to Salesforce: ' + err.message); 
      done();
    }); 
  });    
 
});