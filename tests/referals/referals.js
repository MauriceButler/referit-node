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

test('referals.confirm Exists', function (t) {
    t.plan(2);
    var referals = getCleanTestObject();
    t.ok(referals.confirm, 'referals.confirm Exists');
    t.equals(typeof referals.confirm, 'function',  'referals.confirm is an funtion');
});

test('transmissionId is required', function (t){
    t.plan(2);
    var referals = getCleanTestObject();
    referals.confirm(null, function(error){
        t.ok(error, 'error recieved');
        t.equals(error.message, 'Transmission Id is required.', 'correct error message');
    });
});

test('referals.confirm uses default callback', function (t) {
    t.plan(1);
    var referals = getCleanTestObject(function(options, callback){
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    referals.confirm('sadas');
});

test('referals.confirm send correct request', function (t) {
    t.plan(3);

    var transmissionId = '1234';
        referals = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'referals/'+ transmissionId, 'recieved correct url');
        t.equals(options.method, 'POST', 'is a POST request');
        t.equals(options.json.transmissionId, transmissionId, 'recieved correct transmissionId');
    });

    referals.confirm(transmissionId);
});