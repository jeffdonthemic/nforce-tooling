var nock = require('nock');

nock('https://login.salesforce.com:443')
  .post('/services/oauth2/token', "client_id=SOME_CLIENT_ID&client_secret=SOME_CLIENT_SECRET&grant_type=password&username=someuser%40someorg.com&password=PASSWORD!")
  .reply(200, {"id":"https://login.salesforce.com/id/00DE00000001111111/005E00000011111111","issued_at":"1409312637140","token_type":"Bearer","instance_url":"https://nax.salesforce.com","signature":"sadfsadfsadfsadfasdfsadfasfd+6=","access_token":"00DE000000011111111dasdfsadfasdfsadfsadfsadfasdfsadfasdfsa"}, { date: 'Fri, 29 Aug 2014 11:43:56 GMT',
  'set-cookie': [ 'BrowserId=WcVSAiYXRGWn69EiyFUs6A;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:43:57 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  pragma: 'no-cache',
  'cache-control': 'no-cache, no-store',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestCreateContainer"})
  .reply(201, {"id":"1dcE0000000H14CIAS","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:43:58 GMT',
  'set-cookie': [ 'BrowserId=L-8f1rbeScaLex6S5_TVew;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:43:59 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14CIAS',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14CIAS')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:00 GMT',
  'set-cookie': [ 'BrowserId=pn6uTddXSvu6tp8I78CP1A;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:00 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestGetContainer"})
  .reply(201, {"id":"1dcE0000000H14HIAS","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:02 GMT',
  'set-cookie': [ 'BrowserId=b2u2_Lz9QHCofvS1WSQK9Q;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:02 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14HIAS',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .get('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14HIAS')
  .reply(200, {"attributes":{"type":"MetadataContainer","url":"/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14HIAS"},"Id":"1dcE0000000H14HIAS","IsDeleted":false,"CreatedDate":"2014-08-29T11:44:02.000+0000","CreatedById":"005E0000001ejPQIAY","LastModifiedDate":"2014-08-29T11:44:02.000+0000","LastModifiedById":"005E0000001ejPQIAY","SystemModstamp":"2014-08-29T11:44:02.000+0000","Name":"TestGetContainer"}, { date: 'Fri, 29 Aug 2014 11:44:04 GMT',
  'set-cookie': [ 'BrowserId=g46MFBoLQlSW36hfRFkBPQ;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:04 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000',
  'last-modified': 'Fri, 29 Aug 2014 11:44:02 GMT',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14HIAS')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:05 GMT',
  'set-cookie': [ 'BrowserId=7d8nvzzVSE-ipekbLhdSKQ;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:05 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestDeleteContainer"})
  .reply(201, {"id":"1dcE0000000H14MIAS","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:07 GMT',
  'set-cookie': [ 'BrowserId=5zAKLP1wR3Sh3kGp5PyzpQ;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:07 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14MIAS',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14MIAS')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:09 GMT',
  'set-cookie': [ 'BrowserId=chMpMdtbQPa9oWVYeBNKBg;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:09 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=343/15000' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestArtifactContainer"})
  .reply(201, {"id":"1dcE0000000H14RIAS","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:10 GMT',
  'set-cookie': [ 'BrowserId=vm3A0w4BSQS3HthgExY5Kg;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:10 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14RIAS',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClass', {"name":"MochaToolingTest","body":"public class MochaToolingTest {\n\n}"})
  .reply(201, {"id":"01pE0000001wQEkIAM","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:12 GMT',
  'set-cookie': [ 'BrowserId=NX2vt32wS8GLF1yUthxYKQ;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:12 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEkIAM',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClassMember', {"body":"public class MochaToolingTest {\n\n}","contentEntityId":"01pE0000001wQEkIAM","metadataContainerId":"1dcE0000000H14RIAS"})
  .reply(201, {"id":"400E00000008qLYIAY","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:14 GMT',
  'set-cookie': [ 'BrowserId=Dzh-1dQDR2eMIF6DIRtU1A;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:14 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=347/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClassMember/400E00000008qLYIAY',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEkIAM')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:16 GMT',
  'set-cookie': [ 'BrowserId=IkqqWBvGQzSWOppnwNEILg;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:16 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14RIAS')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:18 GMT',
  'set-cookie': [ 'BrowserId=m49kzBKpTOWsMzI-x3Qu9Q;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:18 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=347/15000' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestDeployContainer"})
  .reply(201, {"id":"1dcE0000000H14WIAS","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:19 GMT',
  'set-cookie': [ 'BrowserId=LpJnGknzST-n7OY-utAPiw;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:20 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14WIAS',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClass', {"name":"MochaToolingTest","body":"public class MochaToolingTest {\n\n}"})
  .reply(201, {"id":"01pE0000001wQEpIAM","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:21 GMT',
  'set-cookie': [ 'BrowserId=8kchg7FJTPuqqiNWK2rUAw;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:22 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEpIAM',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClassMember', {"body":"public class MochaToolingTest {\n\n}","contentEntityId":"01pE0000001wQEpIAM","metadataContainerId":"1dcE0000000H14WIAS"})
  .reply(201, {"id":"400E00000008qLdIAI","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:23 GMT',
  'set-cookie': [ 'BrowserId=G9oiC9sqTLClU-IUc8CSog;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:24 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClassMember/400E00000008qLdIAI',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest', {"isCheckOnly":true,"metadataContainerId":"1dcE0000000H14WIAS"})
  .reply(201, {"id":"1drE0000000EAp6IAG","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:25 GMT',
  'set-cookie': [ 'BrowserId=EnjbYBO9TIyp74Oo-BE7oA;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:26 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000',
  location: '/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest/1drE0000000EAp6IAG',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEpIAM')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:28 GMT',
  'set-cookie': [ 'BrowserId=fHwkgUzsTrOwNHeOK3_Swg;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:28 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14WIAS')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:29 GMT',
  'set-cookie': [ 'BrowserId=s1pjpVsZSW6IryiZf2h2PA;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:29 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=345/15000' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/MetadataContainer', {"name":"TestDeployContainer"})
  .reply(201, {"id":"1dcE0000000H14bIAC","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:31 GMT',
  'set-cookie': [ 'BrowserId=Xhr1GHSKSfih3VwVtkw3nA;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:31 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=347/15000',
  location: '/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14bIAC',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClass', {"name":"MochaToolingTest","body":"public class MochaToolingTest {\n\n}"})
  .reply(201, {"id":"01pE0000001wQEuIAM","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:33 GMT',
  'set-cookie': [ 'BrowserId=tYrldIt1R1a0JQeO1CWJdw;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:33 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=349/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEuIAM',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ApexClassMember', {"body":"public class MochaToolingTest {\n\n}","contentEntityId":"01pE0000001wQEuIAM","metadataContainerId":"1dcE0000000H14bIAC"})
  .reply(201, {"id":"400E00000008qLiIAI","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:35 GMT',
  'set-cookie': [ 'BrowserId=YJHktRQ7RpqvfF9TsL6Jug;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:35 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=349/15000',
  location: '/services/data/v30.0/tooling/sobjects/ApexClassMember/400E00000008qLiIAI',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .post('/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest', {"isCheckOnly":true,"metadataContainerId":"1dcE0000000H14bIAC"})
  .reply(201, {"id":"1drE0000000EApBIAW","success":true,"errors":[]}, { date: 'Fri, 29 Aug 2014 11:44:37 GMT',
  'set-cookie': [ 'BrowserId=i4Nox3ylR56ldiexAMENog;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:38 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=349/15000',
  location: '/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest/1drE0000000EApBIAW',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .get('/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest/1drE0000000EApBIAW')
  .reply(200, {"attributes":{"type":"ContainerAsyncRequest","url":"/services/data/v30.0/tooling/sobjects/ContainerAsyncRequest/1drE0000000EApBIAW"},"Id":"1drE0000000EApBIAW","IsDeleted":false,"CreatedDate":"2014-08-29T11:44:38.000+0000","CreatedById":"005E0000001ejPQIAY","LastModifiedDate":"2014-08-29T11:44:39.000+0000","LastModifiedById":"005E0000001ejPQIAY","SystemModstamp":"2014-08-29T11:44:39.000+0000","MetadataContainerId":"1dcE0000000H14bIAC","MetadataContainerMemberId":null,"ErrorMsg":null,"CompilerErrors":"[]","IsRunTests":false,"State":"Completed","IsCheckOnly":true}, { date: 'Fri, 29 Aug 2014 11:44:41 GMT',
  'set-cookie': [ 'BrowserId=SEWr9glWSsON-FJd-qfklw;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:41 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=349/15000',
  'last-modified': 'Fri, 29 Aug 2014 11:44:39 GMT',
  'content-type': 'application/json;charset=UTF-8',
  'transfer-encoding': 'chunked' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/ApexClass/01pE0000001wQEuIAM')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:42 GMT',
  'set-cookie': [ 'BrowserId=w-AniqUKSUmxh4PTguH5nw;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:42 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=349/15000' });


nock('https://nax.salesforce.com:443')
  .delete('/services/data/v30.0/tooling/sobjects/MetadataContainer/1dcE0000000H14bIAC')
  .reply(204, "", { date: 'Fri, 29 Aug 2014 11:44:43 GMT',
  'set-cookie': [ 'BrowserId=tstYlSkpTIyQ7OzKML1u2A;Path=/;Domain=.salesforce.com;Expires=Tue, 28-Oct-2014 11:44:43 GMT' ],
  expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
  'sforce-limit-info': 'api-usage=351/15000' });
