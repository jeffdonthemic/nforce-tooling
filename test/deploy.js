var nforce = require("nforce");
var deploy = require('../')(nforce, 'deploy');
var should = require("should");
var Q = require("q");
var config = require("./config");

var oauth;

var org = nforce.createConnection({
  clientId: config.connection.clientId,
  clientSecret: config.connection.clientSecret,
  redirectUri: config.connection.redirectUri,
  mode: 'single',
  plugins: ['deploy']
});

describe('deploy', function() {
  this.timeout(config.timeout);

  describe('#createContainer()', function(){
    it('should create a new deployment container successfully', function(done){
      var name = 'TestCreateContainer';
      var assertError;

      createContainerAsPromised(name)
        .then(function(result) {
          try {
            result.success.should.be.eql(true);
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .then(function(result){
          return deleteAsPromised('MetadataContainer', result.id);
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);      
        });
    });
  })

  describe('#getContainer()', function(){
    it('should return a deployment container successfully', function(done){
      var name = 'TestGetContainer';
      var containerId;
      var assertError;

      createContainerAsPromised(name)
        .then(function(result) {
          containerId = result.id;
          return getContainerAsPromised(containerId);
        })
        .then(function(result) {
          try {
            result.Name.should.be.eql(name);
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .then(function(result){
          return deleteAsPromised('MetadataContainer', containerId);
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);
        });
    });
  })

  describe('#deleteContainer()', function(){
    it('should delete a deployment container successfully', function(done){
      var name = 'TestDeleteContainer';
      var assertError;

      createContainerAsPromised(name)
        .then(function(result){
          return deleteAsPromised('MetadataContainer', result.id);
        })
        .then(function(result) {
          try {
            result.success.should.eql(true);
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);       
        });
    });
  })

  describe('#addContainerArtifact()', function(){
    it('should add an Apex class to a container successfully', function(done){
      var name = 'TestArtifactContainer';
      var containerId;
      var apexClassId;
      var assertError;

      createContainerAsPromised(name)
        .then(function(result) {
          containerId = result.id;
          return createApexClassAsPromised();
        })
        .then(function(result) {
          apexClassId = result.id;
          // create the new working apex class with changes
          var artifact = org.deploy.createDeployArtifact('ApexClassMember',
            {body: 'public class MochaToolingTest {\n\n}', contentEntityId: result.id});
          return addContainerArtifactAsPromised(containerId, artifact);
        })
        .then(function(result) {
          try {
            result.success.should.be.eql(true);
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .then(function(result){
          return deleteAsPromised('ApexClass', apexClassId);
        }) 
        .then(function(result){
          return deleteAsPromised('MetadataContainer', containerId);
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);    
        });
    });
  })

  describe('#deployContainer()', function(){
    it('should successfully deploy the container', function(done){
      var name = 'TestDeployContainer';
      var containerId;
      var apexClassId;
      var assertError;

      createContainerAsPromised(name)
        .then(function(result) {
          containerId = result.id;
          return createApexClassAsPromised();
        })
        .then(function(result) {
          apexClassId = result.id;
          // create the new working apex class with changes
          var artifact = org.deploy.createDeployArtifact('ApexClassMember',
            {body: 'public class MochaToolingTest {\n\n}', contentEntityId: result.id});
          return addContainerArtifactAsPromised(containerId, artifact);
        })
        .then(function(result) {
          return deployContainerAsPromised(containerId);
        })
        .then(function(result) {
          try {
            result.success.should.be.eql(true);
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .then(function(result){
          return deleteAsPromised('ApexClass', apexClassId);
        })
        .then(function(result){
          return deleteAsPromised('MetadataContainer', containerId);
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);
        });
    });
  })  

  describe('#getContainerDeployStatus()', function(){
    it('should return the status of Queued for a container', function(done){
      var name = 'TestDeployContainer';
      var containerId;
      var apexClassId;
      var assertError;

      createContainerAsPromised(name)
        .then(function(result) {
          containerId = result.id;
          return createApexClassAsPromised();
        })
        .then(function(result) {
          apexClassId = result.id;
          // create the new working apex class with changes
          var artifact = org.deploy.createDeployArtifact('ApexClassMember',
            {body: 'public class MochaToolingTest {\n\n}', contentEntityId: result.id});
          return addContainerArtifactAsPromised(containerId, artifact);
        })
        .then(function(result) {
          return deployContainerAsPromised(containerId);
        })
        .then(function(result) {
          return getDeployStatusAsPromised(result.id);
        })
        .then(function(result) {
          try {
            result.State.should.not.be.eql('Queued');
          } catch(err) {
            assertError = err;
          }
          return result;
        })
        .then(function(result){
          return deleteAsPromised('ApexClass', apexClassId);
        })
        .then(function(result){
          return deleteAsPromised('MetadataContainer', containerId);
        })
        .fail(function(err) {
          console.log(err);
        })
        .fin(function(result) {
          done(assertError);
        });
    });
  });

  before(function(done){
    org.authenticate({ username: config.connection.sfuser, password: config.connection.sfpass}, function(err, resp){
      if (!err) oauth = resp;
      if (err) console.log('Error connecting to Salesforce: ' + err.message);
      done();
    });
  });  

});

// promise functions that do the actual work

function createContainerAsPromised(name) {
  var deferred = Q.defer();
  org.deploy.createContainer({name: name}, function(err, resp) {
    if (config.debug) {
      console.log('Creating container....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function deleteAsPromised(type, id) {
  var deferred = Q.defer();
  org.deploy.delete({type: type, id: id}, function(err, resp) {
    if (config.debug) {
      console.log('Deleting ' + type + '....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function getContainerAsPromised(id) {
  var deferred = Q.defer();
  org.deploy.getContainer({id: id}, function(err, resp) {
    if (config.debug) {
      console.log('Get container....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function getContainerStatusAsPromised(id) {
  var deferred = Q.defer();
  org.deploy.getContainerDeployStatus({id: id}, function(err, resp) {
    if (config.debug) {
      console.log('Get container status....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function createApexClassAsPromised() {
  var deferred = Q.defer();
  var obj = {
    name: 'MochaToolingTest',
    body: 'public class MochaToolingTest {\n\n}'
  };
  org.deploy.insert({type: 'ApexClass', object: obj}, function(err, resp) {
    if (config.debug) {
      console.log('Inserting ApexClass....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function addContainerArtifactAsPromised(id, artifact) {
  var deferred = Q.defer();
  org.deploy.addContainerArtifact({id: id, artifact: artifact}, function(err, resp) {
    if (config.debug) {
      console.log('Adding container artifact....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function deployContainerAsPromised(id) {
  var deferred = Q.defer();
  org.deploy.deployContainer({id: id}, function(err, resp) {
    if (config.debug) {
      console.log('Deploying container....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}

function getDeployStatusAsPromised(id) {
  var deferred = Q.defer();
  org.deploy.getContainerDeployStatus({id: id}, function(err, resp) {
    if (config.debug) {
      console.log('Get deploy status....');
      console.log(resp);
    }
    if (err) deferred.reject(err);
    if (!err) deferred.resolve(resp);
  });
  return deferred.promise;
}