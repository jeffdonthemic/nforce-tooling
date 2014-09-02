var nforce = require("nforce");
var tooling = require('../')(nforce, 'toolingTests');
var should = require("should");
var Q = require("q");
var _ = require('lodash');
var config = require("./config");

var oauth;
var metadataContainerId;
var allApexClassIds = [];
var apexTestClassId;

var org = nforce.createConnection({
	clientId: config.connection.clientId,
	clientSecret: config.connection.clientSecret,
	redirectUri: config.connection.redirectUri,
	mode: 'single',
	plugins: ['toolingTests']
});

describe('runTests', function() {
	this.timeout(50000);

  describe('#runTestsAsync', function(){
    it('should return test results correctly', function(done){
      // kick off the job
      org.toolingTests.runTestsAsync({ids: apexTestClassId}, function(err, jobId) {
        if (err) console.log(err);
        jobId.should.not.be.null;
        // get the test status
        org.toolingTests.getAsyncTestStatus({id: jobId}, function(err, resp) {
          if (err) console.log(err);
          resp.size.should.eql(1);
          resp.totalSize.should.eql(1);
          resp.records.should.be.instanceof(Array);
          resp.records[0].Id.should.not.be.null;
          resp.records[0].Status.should.not.be.null;
          resp.records[0].ApexClassId.should.not.be.null;

          // wait 5 seconds and then get the test results
          console.log("     Info: Waiting 5 seconds for salesforce tests to finish.");
          setTimeout(
            function () {
              org.toolingTests.getAsyncTestResults({ids: [resp.records[0].Id]}, function(err, resp) {
                if (err) console.log(err);
                resp.size.should.eql(1);
                resp.totalSize.should.eql(1);
                resp.records.should.be.instanceof(Array);
                resp.records[0].Outcome.should.eql("Pass");
                done();
              });
            }
          , 5000);
        });
      });
    })
  });  

  // create the apex class and test class
  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
			if (!err) {
				oauth = resp;

        // insert the apex class
        var apexClass = { 
          name: "ToolingApiMocha",
          body: "public class ToolingApiMocha {\n public String getName() { return 'name'; } \n}"
        };

        org.toolingTests.insert({type: 'ApexClass', object: apexClass}, function(err, resp) {
          if (err) { console.log(err); }
          if (!err) { 
            allApexClassIds.push(resp.id);

            // now insert the test class AFTER the apex class was inserted.
            var apexTestClass = { 
              name: "ToolingApiMocha_Test",
              body: "@isTest\n private class ToolingApiMocha_Test {\n\n static testMethod void assertName() {\n ToolingApiMocha t = new ToolingApiMocha();\n System.assert(t.getName() == 'name');\n}\n\n}"
            };

            org.toolingTests.insert({type: 'ApexClass', object: apexTestClass}, function(err, resp) {
              if (err) { console.log(err); }
              if (!err) { 
                allApexClassIds.push(resp.id);
                apexTestClassId = resp.id;
                done();
              }
            });
          }
        });
			}
			if (err) console.log('Error connecting to Salesforce: ' + err.message);
		});
	});

  // delete apex classes that were inserted into the org
  after(function(done){
    var counter = 0;
    console.log("     Info: Trying to delete Apex classes from org that were created.")
    _(allApexClassIds).forEach(function(id) {
      org.toolingTests.delete({type: 'ApexClass', id: id}, function(err, resp) {
        counter = counter + 1;
        // if we couldn't get a lock on the class, try again in 5 seconds
        if (err) {
          console.log('     Info: Could not delete all ApexClasses. Trying again in 5 seconds. You will see a warning if it fails.');
          counter = counter - 1;

          setTimeout(
            function () {
              org.toolingTests.delete({type: 'ApexClass', id: id}, function(err, resp) {      
                if (err) { console.log('     Info: Crap! Could not delete ApexClass ' + id); }
                done();
              });
            }
          , 5000);

        };
        // if we've processes all of the clases, we are done.
        if (counter == allApexClassIds.length) {
          done();
        }
      });

    });

  });  

});
