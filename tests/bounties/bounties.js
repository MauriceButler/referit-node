var test = require('tape'),
    mockery = require('mockery'),
    testConfig = {
        url: 'http://test.com/'
    },
    wrapCallback = function(callback){
        return callback;
    };

mockery.registerAllowables(['../../bounties/bounties']);
mockery.registerMock('../config', testConfig);

function getCleanTestObject(request){
    mockery.enable({ useCleanCache: true, warnOnReplace: false });
    var bounties = require('../../bounties/bounties')(request, wrapCallback);
    mockery.disable();
    return bounties;
}

test('bounties Exists', function (t) {
    t.plan(2);
    var bounties = getCleanTestObject();
    t.ok(bounties, 'bounties Exists');
    t.equals(typeof bounties, 'object',  'bounties is an object');
});

test('bounties.get defaults to all', function (t) {
    t.plan(2);
    var bounties = getCleanTestObject(function(url, callback){
        t.equals(url, testConfig.url + 'bounties', 'recieved correct url');
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    bounties.get();
});

test('bounties.get uses provided values', function (t) {
    t.plan(2);
    var testId = '123abc';
    var bounties = getCleanTestObject(function(url, callback){
        t.equals(url, testConfig.url + 'bounties/' + testId, 'recieved correct url');
        callback();
    });

    bounties.get(testId, function(){
        t.pass('callback used');
    });
});

test('bounties.create agent is required', function (t) {
    t.plan(1);
    var testAgent = null;
    var bounties = getCleanTestObject();

    bounties.create(testAgent, function(error){
        t.equal(error.message, 'Agent data is required.', 'correctly errored');
    });
});

test('bounties.create agent is created default callback', function (t) {
    t.plan(4);
    var testAgent = {foo: 'bar'};
    var bounties = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'bounties', 'recieved correct url');
        t.equals(options.method, 'POST', 'is a POST request');
        t.equals(options.json, testAgent, 'recieved correct agent data');
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    bounties.create(testAgent);
});

test('bounties.create agent is created callback used', function (t) {
    t.plan(2);
    var testAgent = {foo: 'bar'};
    var bounties = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'bounties', 'recieved correct url');
        callback();
    });

    bounties.create(testAgent, function(){
        t.pass('callback used');
    });
});

test('bounties.delete bountyId is required', function (t) {
    t.plan(1);
    var testAgentId = null;
    var bounties = getCleanTestObject();

    bounties.delete(testAgentId, function(error){
        t.equal(error.message, 'Bounty id is required.', 'correctly errored');
    });
});

test('bounties.delete sends correct data', function (t) {
    t.plan(2);
    var testAgentId = 123456;
    var bounties = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'bounties/' + testAgentId, 'recieved correct url');
        t.equals(options.method, 'DELETE', 'is a DELETE request');
    });

    bounties.delete(testAgentId);
});

test('bounties.delete uses default callback', function (t) {
    t.plan(1);
    var testAgentId = 123456;
    var bounties = getCleanTestObject(function(options, callback){
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    bounties.delete(testAgentId);
});

test('bounties.assign bounty is assigned', function (t) {
    t.plan(2);
    var testAgentId = 123456;
    var testBountyId = 123456;
    var bounties = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'bounties/assign', 'recieved correct url');
        t.equals(options.method, 'POST', 'is a POST request');
    });

    bounties.assign(testBountyId, testAgentId, function(error){
        t.pass('callback used');
    });
});

test('bounties.assign bountyId is required', function (t) {
    t.plan(1);
    var testBountyId = null;
    var testAgentId = null;
    var bounties = getCleanTestObject();

    bounties.assign(testBountyId, testAgentId, function(error){
        t.equal(error.message, 'Bounty id is required.', 'correctly errored');
    });
});

test('bounties.assign bountyId is required', function (t) {
    t.plan(1);
    var testBountyId = null;
    var testAgentId = null;
    var bounties = getCleanTestObject();

    bounties.assign(testBountyId, testAgentId, function(error){
        t.equal(error.message, 'Bounty id is required.', 'correctly errored');
    });
});