var _ = require('lodash');

module.exports = function(nforce, pluginName) {

  if (!pluginName) pluginName = 'tooling';

  // throws if the plugin already exists
  var plugin = nforce.plugin(pluginName);

   // returns a record based upons its ID
  plugin.fn('getRecord', function(args, callback) {
    var validator = validate(args, ['id', 'type']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type + '/' + args.id;
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

   // returns 'describe' metadata at all levels for the specified object including fields, URLs, and child relationships.
  plugin.fn('getDescribe', function(args, callback) {
    var validator = validate(args, ['type']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type + '/describe';
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

   // returns metadata for a specific custom field on a custom object
  plugin.fn('getCustomField', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/CustomField/' + args.id;
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

    // Returns the high-level metadata for the specified object
  plugin.fn('getObject', function(args, callback) {
    var validator = validate(args, ['type']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type;
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

  // returns the available Tooling API objects and their metadata.
  plugin.fn('getObjects', function(args, callback) {
    var opts = this._getOpts(args, callback);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/';
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

  // creates a MetadataContainer to hold deployment objects
  plugin.fn('createContainer', function(args, callback) {
    var validator = validate(args, ['name']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/MetadataContainer';
    opts.method = 'POST';
    opts.body = JSON.stringify({name: args.name});

    return this._apiRequest(opts, opts.callback);

  });

  // returns a MetadataContainer by id
  plugin.fn('getContainer', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/MetadataContainer/' + args.id;
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

  // returns a MetadataContainer by id
  plugin.fn('addContainerArtifact', function(args, callback) {
    var validator = validate(args, ['id', 'artifact']);
    var opts = this._getOpts(args, callback);
    var body = {};

    if (validator.error) return callback(new Error(validator.message), null);

    // add the container to the artifact
    args.artifact.metadataContainerId = args.id;

    // create the body for the request without any null properties and type
    _.pairs(args.artifact).forEach(function(entry) {
      if (!_.isNull(_.last(entry)) && _.first(entry) !== 'type') {
        body[_.first(entry)] = _.last(entry);
      }
    });

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.artifact.type;
    opts.method = 'POST'
    opts.body = JSON.stringify(body);

    return this._apiRequest(opts, opts.callback);

  });

  // deletes a MetadataContainer by id
  plugin.fn('deleteContainer', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/MetadataContainer/' + args.id;
    opts.method = 'DELETE';

    return this._apiRequest(opts, opts.callback);

  });

 // deploys a MetadataContainer and all objects
  plugin.fn('deployContainer', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    var body = {
        isCheckOnly: true,
        metadataContainerId: args.id
    };

    if (validator.error) return callback(new Error(validator.message), null);

    // look for passed argements
    if (!_.isUndefined(args.isCheckOnly)) body.isCheckOnly = args.isCheckOnly;

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/ContainerAsyncRequest';
    opts.method = 'POST';
    opts.body = JSON.stringify(body);

    return this._apiRequest(opts, opts.callback);

  });

  // checks the current status of a deployment
  plugin.fn('getContainerDeployStatus', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/ContainerAsyncRequest/' + args.id;
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);
    
  });

  // inserts a new record
  plugin.fn('insert', function(args, callback) {
    var validator = validate(args, ['type' , 'object']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type;
    opts.method = 'POST';
    opts.body = JSON.stringify(args.object);

    return this._apiRequest(opts, opts.callback);

  });

  // updates an existing record
  plugin.fn('update', function(args, callback) {
    var validator = validate(args, ['id', 'type', 'object']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type + '/' + args.id;
    opts.method = 'PATCH';
    opts.body = JSON.stringify(args.object);

    return this._apiRequest(opts, opts.callback);
  });

  // deletes a record by id
  plugin.fn('delete', function(args, callback) {
    var validator = validate(args, ['id', 'type']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/' + args.type + '/' + args.id;
    opts.method = 'DELETE';

    this._apiRequest(opts, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, {success: true}); }
    });

  });

  plugin.fn('query', function(args, callback) {
    var validator = validate(args, ['q']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/query?q=' + encodeURIComponent(args.q);
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

  // executes a chunk of Apex code anonymously.
  plugin.fn('executeAnonymous', function(args, callback) {
    var validator = validate(args, ['code']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/executeAnonymous/?anonymousBody=' + encodeURIComponent(args.code);
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

   // rreturns a raw debug log by ID.
  plugin.fn('getApexLog', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/sobjects/ApexLog/' + args.id + '/Body',
    opts.method = 'GET'

    return this._apiRequest(opts, opts.callback);

  });

  // returns the apex code coverages for the entire org
  plugin.fn('getApexOrgWideCoverage', function(callback) {
    var q = 'select PercentCovered from ApexOrgWideCoverage';
    var opts = this._getOpts(callback);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/query?q=' + encodeURIComponent(q);
    opts.method = 'GET';

    this._apiRequest(opts, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, results.records[0].PercentCovered); }
    });    

  });

  // returns the apex code coverages for a specific apex class or trigger
  plugin.fn('getApexClassOrTriggerCoverage', function(args, callback) {
    var validator = validate(args, ['name']);
    var opts = this._getOpts(args, callback);
    var q = "select Coverage, NumLinesCovered, TestMethodName, ApexClassOrTrigger.Id, ";
    q += "ApexClassOrTrigger.Name, NumLinesUncovered from ApexCodeCoverage ";
    q += "where ApexClassOrTrigger.Name = '"+args.name+"'";

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/query?q=' + encodeURIComponent(q);
    opts.method = 'GET';

    this._apiRequest(opts, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) {
        // ensure that tests have been run and codecoverage exists
        if (results.size != 0) {
          var record = results.records[0];
          var obj = {
            PercentCovered: record.NumLinesCovered / (record.NumLinesUncovered + record.NumLinesCovered)
          }
          return callback(null, _.extend(obj, record));           
        } else {
          return callback(null, new Error("No test coverage data exists. Run tests for this Apex class or Trigger."));
        }
      }
    });      

  });

  // runs specified test synchronously
  plugin.fn('runTestsAsync', function(args, callback) {
    var validator = validate(args, ['ids']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/runTestsAsynchronous/?classids=' + args.ids,
    opts.method = 'GET';

    this._apiRequest(opts, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, results); }
    });

  });
  
  // runs specified test synchronously with post
  plugin.fn('runTestsAsyncPost', function(args, callback) {
    var validator = validate(args, ['ids']);
    var opts = this._getOpts(args, callback);

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/runTestsAsynchronous/',
    opts.method = 'POST';
    opts.body = '{"classids":"' + args.ids + '"}';

    this._apiRequest(opts, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, results); }
    });

  });

  // checks the run tests status of a specific job 
  plugin.fn('getAsyncTestStatus', function(args, callback) {
    var validator = validate(args, ['id']);
    var opts = this._getOpts(args, callback);
    var q = "select Id, Status, ApexClassId FROM ApexTestQueueItem where ParentJobId = '"+args.id+"'";

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/query?q=' + encodeURIComponent(q);
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });

  // returned the results of all runTests
  plugin.fn('getAsyncTestResults', function(args, callback) {
    var validator = validate(args, ['ids']);
    // enclose each id with a single quote for sql
    var sqlIds = "'" + args.ids.join("','") + "'";
    var opts = this._getOpts(args, callback);
    var q = "select StackTrace, Message, AsyncApexJobId, MethodName, Outcome, ApexClass.Id, ApexClass.Name, RunTime, TestTimeStamp ";
    q += "from ApexTestResult where QueueItemId IN ("+sqlIds+")";

    if (validator.error) return callback(new Error(validator.message), null);

    opts.uri = opts.oauth.instance_url + '/services/data/' + this.apiVersion
        + '/tooling/query?q=' + encodeURIComponent(q);
    opts.method = 'GET';

    return this._apiRequest(opts, opts.callback);

  });  

  // factory to create an empty deployment artifact
  plugin.fn('createDeployArtifact', function(type, fields) {

    // for convenience, set up the available properties
    var obj = {
      type: type,
      body: null,
      content: null,
      contentEntityId: null,
      metadata: null,
      metadataContainerId: null,
      symbolTable: null
    }
    return _.extend(obj, fields);

  });

  // utility method to validate inputs
  function validate(args, required) {
    var result = {
      error: false,
      message: 'No errors'
    }

    // ensure required properties were passed in the arguments hash
    if (required) {
      var keys = _.keys(args);
      required.forEach(function(field) {
        if(!_.contains(keys, field)) {
          result.error = true;
          result.message = 'The following values must be passed: ' + required.join(', ');
        }
      })
    }

    return result;

  }

}
