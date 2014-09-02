var nforce = require('nforce'),
  tooling = require('../')(nforce),
  Q = require("q"),
  fs = require('fs'),
  _ = require('lodash'),
  events = require('events'),
  eventEmitter = new events.EventEmitter();

// NEED TO CHANGE TOOLING REFERENCE ABOVE  

var sfuser = process.env.SFUSER;
var sfpass = process.env.SFPASS;

// create an array to keep track of classes that were
// created so we can delete them.
var allApexClassIds = [];
// keep track of apex classes to run
var apexTestClassIds = [];

var org = nforce.createConnection({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single',
  plugins: ['tooling']
});

eventEmitter.on('start', function() {
  org.tooling.runTestsAsync({ids: apexTestClassIds}, function(err, results) {
    if (!err) {
      console.log('Started async runTests job ' + results);
      eventEmitter.emit('status', results);
    }
    if (err) { eventEmitter.emit('error', err); }
  });
});

eventEmitter.on('status', function(jobId) {
  console.log('Checking status of runTests job ' +jobId+ ' repeatedly until all tests complete.');

  function getStatus(jobId) {
    org.tooling.getAsyncTestStatus({id: jobId}, function(err, resp) {
      // pluck the unique status of all items returned.
      var statuses = _.uniq(_.pluck(resp.records, 'Status'));
      // if there is a single 'Complted' status then we are done
      if (statuses.length == 1) {
        console.log("All tests have completed! W00t!");
        var apexTestQueueItemIds = _.uniq(_.pluck(resp.records, 'Id'));
        eventEmitter.emit('results', apexTestQueueItemIds);
      } else {
        console.log("Tests have not completed. Checking status again.");
        getStatus(jobId);
      }
    });
  }
  getStatus(jobId);
});

eventEmitter.on('results', function(ids) {
  // keep track of how many test results we've processed so we know when done (async)
  var counter = 0;
  org.tooling.getAsyncTestResults({ids: ids}, function(err, resp) {
    
    console.log('========================================');
    console.log('** TEST RESULTS **');

    if (!err) {
      _(resp.records).forEach(function(result) {
        if (result.Outcome === 'Fail') {
          console.log('========================================');
          console.log("Results for " + result.ApexClass.Name + ": " + result.Outcome);
          console.log('   ' + result.Message);
          console.log('   ' + result.StackTrace);
          counter++;
          if (counter == ids.length) { eventEmitter.emit('complete'); }
        } else {
          // for coverage, use the class name not the test class name.
          // use "ToolingTest1" instead of "ToolingTest1_test.cls"
          var className = result.ApexClass.Name.substring(0,result.ApexClass.Name.indexOf("_"));
          org.tooling.getApexClassOrTriggerCoverage({name: className}, function(err, coverage) {
            console.log('========================================');
            console.log("Results for " + className + ": " + result.Outcome);
            console.log("   " + "Percentage covered by tests: " + coverage.PercentCovered);
            console.log("   " + "Lines covered / uncovered: " + coverage.NumLinesCovered + " / " + coverage.NumLinesUncovered);
            console.log("   " + "Uncovered lines: " + coverage.Coverage.uncoveredLines.join(", "));
            counter++;
            if (counter == ids.length) { eventEmitter.emit('complete'); }
          });
        }
      });
    }

    if (err) { eventEmitter.emit('error', err); }
  });

});

eventEmitter.on('error', function(error) {
  console.log('Error!!');
  console.log(error);
  cleanUp();
});

eventEmitter.on('complete', function() {
  console.log('Everything complete! Resetting the test environment.');
  cleanUp();
});

org.authenticate({ username: sfuser, password: sfpass}, function(err, resp){
  if(!err) {

    console.log('*** Running tests asynchronously. I know. This is awesome!! ***');
    createApexClasses()
      .then(function(results) {
        eventEmitter.emit('start');
      });
  } else {
    console.log('Error connecting to Salesforce: ' + err.message);
  }
});

// deletes all classes that were created
function cleanUp() {

  _(allApexClassIds).forEach(function(id) { 

    org.tooling.delete({type: 'ApexClass', id: id}, function(err, resp) {
      if (err) {
        console.log(err);
        console.log('Could not delete ApexClass ' + id + '. Trying again in 5 seconds.');

        setTimeout(
          function () {
            org.tooling.delete({type: 'ApexClass', id: id}, function(err, resp) {
              if (!err) { console.log('Deleted ApexClass ' + id); }             
              if (err) { console.log('Crap! Could not delete ApexClass ' + id); } 
            });
          }
        , 5000);

      };
      if (!err) { console.log('Deleted ApexClass ' + id); }
    });

  });

}

/**
creates all apex classes
**/
function createApexClasses() {
  var deferred = Q.defer();

  function getApexCodeAsPromised(file) {
    var deferred = Q.defer();
    fs.readFile(__dirname + '/apex/' + file, 'utf8', function (err, contents) {
      if (err) { deferred.reject(err); }
      if (!err) { deferred.resolve(contents); }
    });
    return deferred.promise;
  }

  function createApexClassAsPromised(obj) {
    var deferred = Q.defer();
    org.tooling.insert({type: 'ApexClass', object: obj}, function(err, resp) {
      if (err) {
        console.log(err);
        deferred.reject(err);
      }
      if (!err) {
        console.log('Inserted ApexClass ' +obj.name);
        deferred.resolve(resp);
      }
    });
    return deferred.promise;
  }

   Q.all([
      getApexCodeAsPromised('toolingtest1.cls'),
      getApexCodeAsPromised('toolingtest2.cls')
    ]).then(function(classes) {
      // now insert the apex classes    
      Q.all([
        createApexClassAsPromised({ name: 'ToolingTest1', body: classes[0] }),
        createApexClassAsPromised({ name: 'ToolingTest2', body: classes[1] })
      ]).then(function(results) {
        // add each id to the array
        _(_.pluck(results, 'id')).forEach(function(id) { allApexClassIds.push(id) });

        // now insert all the test classes after the classes have complete submitted
        Q.all([
          getApexCodeAsPromised('toolingtest1_test.cls'),
          getApexCodeAsPromised('toolingtest2_test.cls')
        ]).then(function(classes) {
          Q.all([
            createApexClassAsPromised({ name: 'ToolingTest1_Test', body: classes[0] }),
            createApexClassAsPromised({ name: 'ToolingTest2_Test', body: classes[1] })
          ]).then(function(results) {
            // add each id to the array
            _(_.pluck(results, 'id')).forEach(function(id) { allApexClassIds.push(id) });
            _(_.pluck(results, 'id')).forEach(function(id) { apexTestClassIds.push(id) });
            deferred.resolve(apexTestClassIds);
          });
        });

      });
    });
    return deferred.promise;
}
