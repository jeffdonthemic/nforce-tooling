module.exports = function(nforce) {

  // throws if the plugin already exists
  var plugin = nforce.plugin('tooling');
  
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
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion + '/tooling/query?q=' + q, 
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
        uri: this.oauth.instance_url + '/services/data' + this.apiVersion + '/tooling/sobjects/MetadataContainer', 
        method: 'POST',
        body: JSON.stringify({name: name})
      }

      return this._apiBlobRequest(opts, this.oauth, callback);
    }

  });  
  
}