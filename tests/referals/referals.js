var test = require('tape'),
    mockery = require('mockery'),
    pathToObjectUnderTest = '../../referals/referals',
    testConfig = {
        url: 'http://test.com/'
    },
    wrapCallback = function(callback){
        return callback;
    };

mockery.registerAllowables([pathToObjectUnderTest]);

function resetMocks(){
    mockery.registerMock('../config', testConfig);
}

function getCleanTestObject(request){
    mockery.enable({ useCleanCache: true, warnOnReplace: false });
    var objectUnderTest = require(pathToObjectUnderTest)(request, wrapCallback);
    mockery.disable();
    resetMocks();
    return objectUnderTest;
}

resetMocks();

test('referals Exists', function (t) {
    t.plan(2);
    var referals = getCleanTestObject();
    t.ok(referals, 'referals Exists');
    t.equals(typeof referals, 'object',  'referals is an object');
});

test('referals Exists', function (t) {
    t.plan(2);
    var referals = getCleanTestObject();
    t.ok(referals.confirm, 'referals.confirm Exists');
    t.equals(typeof referals.confirm, 'function',  'referals.confirm is an funtion');
});

test('transmissionId is required', function (t){

});

// test('agents.create agent is created default callback', function (t) {
//     t.plan(4);
//     var testAgent = {foo: 'bar'};
//     var agents = getCleanTestObject(function(options, callback){
//         t.equals(options.url, testConfig.url + 'agents', 'recieved correct url');
//         t.equals(options.method, 'POST', 'is a POST request');
//         t.equals(options.json, testAgent, 'recieved correct agent data');
//         t.equals(callback.toString(), 'function (){}', 'recieved default callback');
//     });

//     agents.create(testAgent);
// });