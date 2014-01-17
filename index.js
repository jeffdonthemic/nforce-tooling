var _ = require('underscore');
var util = require("util");

module.exports = function(nforce) {

  // throws if the plugin already exists
  var plugin = nforce.plugin('tooling');

  // executes a chunk of Apex code anonymously.
  plugin.fn('executeAnonymous', function(code, oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if(typeof code !== 'string') {
      return callback(new Error('You must specify code to execute'));
    }    

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/executeAnonymous/?anonymousBody=' + encodeURIComponent(code), 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }    

  });  

   // rreturns a raw debug log by ID.
  plugin.fn('getApexLog', function(id, oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/sobjects/ApexLog/' + id + '/Body', 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });       

   // returns a record based upons its ID
  plugin.fn('getRecord', function(id, name, oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/sobjects/' + name + '/' + id, 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });     

   // returns 'describe' metadata at all levels for the specified object including fields, URLs, and child relationships.
  plugin.fn('getDescribe', function(name, oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/sobjects/' + name + '/describe', 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });   

    // Returns the high-level metadata for the specified object
  plugin.fn('getObject', function(name, oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/sobjects/' + name, 
        method: 'GET'
      }

      console.log(opts);

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });      

  // returns the available Tooling API objects and their metadata.
  plugin.fn('getObjects', function(oauth, callback) {
    var opts;

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }    

    if(!callback) callback = function(){};

    if (!this.apiVersion) {
      return callback(new Error('No API version specified'), null)
    } else {
      if (!plugin.util.validateOAuth(this.oauth)) return callback(new Error('Invalid oauth object argument'), null);

      opts = {
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
          + '/tooling/sobjects/', 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });   

  // creates a MetadataContainer to hold deployment objects
  plugin.fn('createContainer', function(args, callback) {
    var opts;

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/MetadataContainer', 
      method: 'POST',
      body: JSON.stringify({name: args.name})
    }

    this._apiBlobRequest(opts, this.oauth, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, JSON.parse(results)); }
    });    

  });   

  // returns a MetadataContainer by id
  plugin.fn('getContainer', function(args, callback) {
    var opts;

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/MetadataContainer/' + args.id, 
      method: 'GET'
    }

    this._apiBlobRequest(opts, this.oauth, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, JSON.parse(results)); }
    });    

  });    

  // returns a MetadataContainer by id
  plugin.fn('addContainerArtifact', function(args, callback) {
    var opts, body = {};

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);

    // add the container to the artifact
    args.artifact.metadataContainerId = args.containerId;

    // create the body for the request without any null properties and type
    _.pairs(args.artifact).forEach(function(entry) {
      if (!_.isNull(_.last(entry)) && _.first(entry) !== 'type') {
        body[_.first(entry)] = _.last(entry);
      }
    });

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/' + args.artifact.type, 
      method: 'POST',
      body: JSON.stringify(body)
    }

    return this._apiRequest(opts, this.oauth, null, callback);

  });    

  // deletes a MetadataContainer by id
  plugin.fn('deleteContainer', function(args, callback) {
    var opts;

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);    

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/MetadataContainer/' + args.id, 
      method: 'DELETE'
    }

    this._apiBlobRequest(opts, this.oauth, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, {success: true}); }
    });

  });    

 // deploys a MetadataContainer and all objects
  plugin.fn('deployContainer', function(args, callback) {
    var opts, 
      body = { 
        isCheckOnly: true,
        metadataContainerId: args.containerId
      };

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);  

    // look for passed argements
    if (!_.isUndefined(args.isCheckOnly)) body.isCheckOnly = args.isCheckOnly;      

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/ContainerAsyncRequest', 
      method: 'POST',
      body: JSON.stringify(body)
    }

    this._apiBlobRequest(opts, this.oauth, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, JSON.parse(results)); }
    });        

  });    

  // checks the current status of a deployment
  plugin.fn('getContainerDeployStatus', function(args, callback) {
    var opts;
    // specify the properties to be returned from salesforce
    var whitelistKeys = ['Id', 'MetadataContainerId', 'ErrorMsg', 'CompilerErrors', 'IsRunTests', 'State', 'IsCheckOnly'];

    if(!callback) callback = function(){};

    var validator = validate.call(this, args.oauth);
    if (validator.error) return callback(new Error(validator.message), null);    

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/sobjects/ContainerAsyncRequest/' + args.id, 
      method: 'GET'
    }

    return this._apiRequest(opts, this.oauth, null, function(err, results) {
      if (err) { return callback(err, null); }
      if (!err) { return callback(null, _.pick(results, whitelistKeys)); }
    });        

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

  plugin.fn('query', function(q, oauth, callback) {
    var opts;

    if(!callback) callback = function(){};    

    var validator = validate.call(this, oauth);
    if (validator.error) return callback(new Error(validator.message), null);

    opts = {
      uri: this.oauth.instance_url + '/services/data' + this.apiVersion 
        + '/tooling/query?q=' + encodeURIComponent(q), 
      method: 'GET'
    }

    return this._apiRequest(opts, this.oauth, null, callback);

  });

  // temp -- helper to get rid of boilerplate code. nforce will fix eventually
  function validate(oauth) {
    var result = {
      error: false,
      message: 'No errors'
    }

    if (!this.apiVersion) {
      result.error = true;
      result.message = 'No API version specified';
    }

    if (!plugin.util.validateOAuth(this.oauth)) {
      result.error = true;
      result.message = 'Invalid oauth object argument';
    }

    if(this.mode === 'single') {
      var args = Array.prototype.slice.call(arguments);
      oauth = this.oauth;
      if(args.length === 2) callback = args[1];
    }        

    return result;

  }
  
}