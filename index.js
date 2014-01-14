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
  plugin.fn('createContainer', function(name, oauth, callback) {
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
          + '/tooling/sobjects/MetadataContainer', 
        method: 'POST',
        body: JSON.stringify({name: name})
      }

      return this._apiBlobRequest(opts, this.oauth, callback);
    }

  });  

  plugin.fn('query', function(q, oauth, callback) {
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
          + '/tooling/query?q=' + q, 
        method: 'GET'
      }

      return this._apiRequest(opts, this.oauth, null, callback);
    }

  });
  
}