var config = {}

config.connection = {}
config.records = {}

// mocha timeout for the entire suite
config.timeout = 10000;
// displays results from salesforce api calls
config.debug = false;

config.connection.sfuser = 'someuser@someorg.com';
config.connection.sfpass = 'PASSWORD!';
config.connection.clientId = 'SOME_CLIENT_ID';
config.connection.clientSecret = 'SOME_CLIENT_SECRET';
config.connection.redirectUri = 'http://localhost:3000/oauth/_callback';

/*
  Some tests for the tooling API are difficult to automate as there is no
  way to obtain IDs that are needed for the calls. The best approach
  is to find the ids for the following below so that the test can run
  successfully. If left null, the test will be skipped.
*/

// to run tests for getCustomField, enter the ID of a custom field from a custom object
config.records.custsomFieldId = '00NE0000005STBl';
// to run tests for getApexLog, enter the ID of a log from the Debug Logs page
config.records.apexLogId = '07LE000001dkqAxMAI';
// to run tests for getApexClassOrTriggerCoverage, enter the name of an Apex class or trigger
config.records.apexClassOrTriggerName = 'bob';

module.exports = config;