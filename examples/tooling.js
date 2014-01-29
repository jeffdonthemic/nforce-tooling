var nforce = require('nforce'),
  tooling = require('nforce-tooling')(nforce);

var sfuser = process.env.SFUSER;
var sfpass = process.env.SFPASS;

var org = nforce.createConnection({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single',
  plugins: ['tooling']
});

org.authenticate({ username: sfuser, password: sfpass}, function(err, resp){
  if(!err) {

    describe();
    objects();
    object();
    query();
    createAndDeleteRecord();

  } else {
    console.log('Error connecting to Salesforce: ' + err.message);
  }
}); 

function createAndDeleteRecord() {
  org.tooling.insert({type: 'MetadataContainer', object: {name: 'ExampleContainer'}}, function(err, record) {
    console.log('==== Creating  MetadataContainer Record ====');
    if (err) console.log(err);
    if (!err) {
      console.log(record);
      // now delete the record
      org.tooling.delete({type: 'MetadataContainer', id: record.id}, function(err, resp) {
        console.log('==== Deleting MetadataContainer Record ====');
        if (err) console.log(err);
        if (!err) console.log(resp);
      });   
    }
  });         
}

function query() {
  var q = 'SELECT Id, Name FROM ApexClass Limit 10';
  org.tooling.query({q: q}, function(err, resp) {  
    console.log('==== Here are some Apex Classes for your enjoyment. ====');
    if (err) console.log(err);
    if (!err) {
      for(var obj in resp.records) {
        console.log(resp.records[obj].Id + " -- " + resp.records[obj].Name);  
      } 
    }  
  });
}

function object() {
  org.tooling.getObject({type: 'ApexClass'}, function(err, resp) {
    console.log('==== Get Object -- ApexClass ====');  
    if (err) console.log(err);
    if (!err) console.log(resp);
  });
}

function objects() {
  org.tooling.getObjects(function(err, resp) {
    console.log('==== All Objects ====');  
    if (err) console.log(err);
    if (!err) {
      for(var obj in resp.sobjects) {
        console.log(resp.sobjects[obj].name);  
        console.log(resp.sobjects[obj].urls);  
      }   
    }
  });
}

function describe() {
  org.tooling.getDescribe({type: 'ApexClass'}, function(err, resp) {
    console.log('==== Describe ApexClass ====');  
    if (err) console.log(err);
    if (!err) console.log(resp);
  });
}