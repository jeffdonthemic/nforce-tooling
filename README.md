nforce-tooling
======

**nforce-tooling** is a [Force.com Tooling API](http://www.salesforce.com/us/developer/docs/api_tooling/index.htm) plugin for [nforce](https://github.com/kevinohara80/nforce).

## Features

* Simple API
* CRUD, query, describe
* Deployment

See the [Force.com Tooling API Developer's Guide](http://www.salesforce.com/us/developer/docs/api_tooling/index.htm) for complete and official documentation. 

**Note**: Not all Tooling API functionality is available via the REST API. #sadtrombone

## Installation

```bash
$ npm install nforce-tooling
```

## Usage

Require **nforce** and **nforce-tooling** in your app and create a client connection to a Salesforce Remote Access Application with the `tooling` plugin enabled.

```js
var nforce = require('nforce'),
  tooling = require('nforce-tooling')(nforce),

var org = nforce.createConnection({
  clientId: 'SOME_OAUTH_CLIENT_ID',
  clientSecret: 'SOME_OAUTH_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi', // optional, 'single' or 'multi' user mode, multi default
  plugins: ['tooling']
});
```

Now we just need to authenticate and get our salesforce OAuth credentials. Here is one way to do this in multi-user mode...

```js
// multi user mode
var oauth;
org.authenticate({ username: 'my_test@gmail.com', password: 'mypassword'}, function(err, resp){
  // store the oauth object for this user
  if(!err) oauth = resp;
});
```

...or in single-user mode...

```js
// single-user mode
org.authenticate({ username: 'my_test@gmail.com', password: 'mypassword'}, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) console.log('Cached Token: ' + org.oauth.access_token)
});
```

See the [nforce readme](https://github.com/kevinohara80/nforce) for more detailed instruction on the awesome features of nforce. 

## nforce-tooling API Basics

### Callbacks

The API of **nforce-tooling** follows typical node.js standards. Callbacks will always pass an optional error object, and a response object. The response object closely resembles the typical responses from the Salesforce REST API.

```js
callback(err, resp);
```

### Calling Functions

API calls take two arguments:

  1. A JavaScript object containing the data for the function  
  2. The callback

```js
var data = {
  name: 'MyClass',
  body: 'public class MyClass {\n\n}'
}
org.tooling.insert({type: 'ApexClass', object: data}, function(err, resp) {
  if (!err) console.log(resp);
  if (err) console.log(err);
}); 
```

If you are using multi-user mode, pass the connection info in the hash with the `oauth` property.

```js
var data = {
  name: 'MyClass',
  body: 'public class MyClass {\n\n}'
}
org.tooling.insert({type: 'ApexClass', object: data, oauth: oauth}, function(err, resp) {
  if (!err) console.log(resp);
  if (err) console.log(err);
}); 
```

### Deploying Changes

Deploying changes to your org with `nforce-tooling` has simple workflow but due to the asynchronous nature can be challenging. This process is much easier to script using [Promises](https://github.com/kriskowal/q). Check the `#getContainerDeployStatus()` test in test/deploy.js or examples directory for more info.

1. Create a new deployment container to hold all of your objects that will be deployed (e.g., ApexClass, ApexPage) with `createContainer()`.
2. Add the working copies of the Tooling object(s) to be deployed (e.g., ApexClassMember, ApexPageMember) to the container with `addContainerArtifact()`. For convenience, you can use the `createDeployArtifact()` factory helper function to construct the artifact.
3. Deploy the container to your org with `deployContainer()`. This will return an ID for the ContainerAsyncRequest created for the deployment.
4. Check the status of the deployment by calling `getContainerDeployStatus()` with the ID of the ContainerAsyncRequest. Keeping checking the status until is it other that 'Queued'.

### Running Salesforce Unit Tests

The current version of the **nforce-tooling** only supports running Salesforce tests asynchronously. See `/examples/runTests.js` and `/tests/runTests.js` for sample code. 

## nforce-tooling Methods

### getObjects()

Returns a collection of available Tooling API objects and their metadata. 


### getObject()

Returns the individual metadata for a specified object. 

* `name`: Required. The name of the object (e.g., MetadataContainer, ApexClass)

### getRecord()

Returns high-level metadata for a specific object. For more detailed metadata, use `getDescribe()`. 

* `id`: Required. The ID of the object.
* `type`: Required. The type of object (e.g., ApexClass, ApexTrigger).

### getDescribe()

Returns detailed metadata at all levels for a specified object. 

* `type`: Required. The type of object to describe (e.g., ApexClass, ApexTrigger).

### getCustomField()

Returns the metadata on a custom field for a custom object. Includes access to the associated CustomField object in Salesforce Metadata API. 

* `id`: Required. The ID of the custom field.

### query()

Executes a query against a Tooling API object and returns data that matches the specified criteria. 

* `q`: Required. The query to execute (e.g., `SELECT Id, Name FROM ApexClass`)

### insert()

Creates a new Tooling API object.

* `object`: Required. The JavaScript object containing the data to insert.
* `type`: Required. The type of object (e.g., ApexClass, ApexTrigger).

### update()

Updates a Tooling API object with the specified data.

* `id`: Required. The ID of the record to update.
* `object`: Required. The JavaScript object containing the data to be updated.
* `type`: Required. The type of object (e.g., ApexClass, ApexTrigger).

### delete()

Deletes a Tooling API object.

* `id`: Required. The ID of the record to delete.
* `type`: Required. The type of object (e.g., ApexClass, ApexTrigger).

### executeAnonymous()

Executes some Apex code anonymously and returns the results.

* `code`: Required. The Apex code. Duh.

### getApexLog()

Returns a raw debug log.

* `id`: Required. The ID of the debug log.

### getApexClassOrTriggerCoverage()

Returns code coverage informaion for the specified Apex class or Trigger. Ensure that tests have been run for the class or trigger so that test coverage data is populated.

* `name`: Required. The name of the Apex class or Trigger.

### getApexOrgWideCoverage()

Returns the Org wide test code coverage for all Apex classes and Triggers.

### runTestsAsync()

Executes test for the specified test classes.

* `ids`: Required. The IDs of the test classes to run.

### getAsyncTestStatus()

Returns the status for all ApexTestQueueItems in the job.

* `jobId`: Required. The ID of the job that contains all of the tests to be run.

### getAsyncTestResults()

Returns the outcome of the test(s).

* `ids`: Required. The comma separated list of ApexTestQueueItem IDs.

### createContainer()

Creates a container as a package for your workspace that manages working copies of Tooling objects, including collections of objects that should be deployed together. 

* `name`: Required. The name of the container.

### deleteContainer()

Deletes a container. 

* `id`: Required. The ID of the container.

### getContainer()

Returns the container. 

* `id`: Required. The ID of the container.

### addContainerArtifact()

Adds an *artifact* to the container for deployment. Use the `createDeployArtifact()` helper function to construct an artifact object. The artifact object links the container, to the saved copy of the object (e.g., ApexClass), to the working copy of the object (e.g., ApexClassMember) for deployment.

* `id`: Required. The ID of the container.
* `artifact`: Required. The JavaScript object containing the artifact data.

```js
var body = 'public class Awesome { public void beAwesome() { } }';
var contentEntityId = '[ID-OF-APEX-CLASS-TO-BE-MODIFIED]';
var artifact = org.tooling.createDeployArtifact('ApexClassMember', {body: body, contentEntityId: contentEntityId});

org.tooling.addContainerArtifact({id: containerId, artifact: artifact}, function(err, resp) {
  if (err) console.log(err);
  if (!err) console.log(resp);
});
```

### deployContainer()

Compiles and deploys a container.

* `id`: Required. The ID of the container.
* `isCheckOnly`: Optional. Indicates whether the asynchronous request compiles the code without making any changes to the organization (true) or compiles and saves the code (false). Default is true.

### getContainerDeployStatus()

Returns the deploy status of a container. 

* `id`: Required. The ID of the container.

Valid states are:

1. Queued - the job is in the queue.
2. Invalidated - Salesforce cancelled the job because the results might not be valid. This state occurs if someone changes the container members while IsCheckOnly=true, or if a newer compile request is added to the queue.
3. Completed - the compilation or deployment finished. If IsCheckOnly is false, the Body for each object was saved and the MetadataContainerId field for each object was reset from the ID of the deployed MetadataContainer to the ID of the corresponding ContainerAsyncRequest object.
4. Failed - the compilation or deployment failed for the reasons stated in the CompilerError field.
5. Error - an unexpected error occurred. The messages in the ErrorMsg field can be provided to Salesforce support if the issue persists.
6. Aborted - use this value to delete a queued deployment.

### createDeployArtifact()

Helper function that creates an *artifact* object to add to a container. 

* `type`: Required. The type of artifact (e.g., ApexClassMember, ApexPageMember)
* `fields`: Optional. A JavaScript object containing any values that will populate the returned artifact object.

```js
{
  type: type,
  body: null,
  content: null,
  contentEntityId: null,
  metadata: null,
  metadataContainerId: null,
  symbolTable: null
}
```

## Running Tests

The mocha tests currently run directly against a Saleforce org. I would like to switch them to use [nock](https://github.com/pgte/nock) in the near future. To run the tests, first you'll need to rename `test/config-example.js` to `test/config.js` and enter your connection parameters. Then run the tests.

```bash
$ npm test
```

## Todo

* Implement ApexExecutionOverlayAction functionality.
* Rewrite tests using nock.
* Hook up to travis-ci.org

## Contributors

* Jeff Douglas -> [jeffdonthemic](https://github.com/jeffdonthemic)
* Kevin O'Hara -> [kevinohara80](https://github.com/kevinohara80)
* Eoin O'Neill -> [thegogz](https://github.com/thegogz)

## Changelog

* `v0.0.4`: Fixed bug for multi mode
* `v0.0.3`: Added support for runTestsAsynchronous
* `v0.0.2`: Fixes for execAnon URL
* `v0.0.1`: Initial release. CRUD, deployment