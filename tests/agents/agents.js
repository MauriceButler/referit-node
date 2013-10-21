var test = require('tape'),
    mockery = require('mockery'),
    testConfig = {
        url: 'http://test.com/'
    };

mockery.registerAllowables(['../../agents/agents']);
mockery.registerMock('../config', testConfig);

function getCleanTestObject(request){
    mockery.enable({ useCleanCache: true, warnOnReplace: false });
    var agents = require('../../agents/agents')(request);
    mockery.disable();
    return agents;
}

test('agents Exists', function (t) {
    t.plan(2);
    var agents = getCleanTestObject();
    t.ok(agents, 'agents Exists');
    t.equals(typeof agents, 'object',  'agents is an object');
});

test('agents.get defaults to all', function (t) {
    t.plan(2);
    var agents = getCleanTestObject(function(url, callback){
        t.equals(url, testConfig.url + 'agent', 'recieved correct url');
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    agents.get();
});

test('agents.get uses provided values', function (t) {
    t.plan(2);
    var testId = '123abc';
    var agents = getCleanTestObject(function(url, callback){
        t.equals(url, testConfig.url + 'agent/' + testId, 'recieved correct url');
        callback();
    });

    agents.get(testId, function(){
        t.pass('callback used');
    });
});

test('agents.create agent is required', function (t) {
    t.plan(1);
    var testAgent = null;
    var agents = getCleanTestObject();

    agents.create(testAgent, function(error){
        t.equal(error.message, 'Agent data is required.', 'correctly errored');
    });
});

test('agents.create agent is created default callback', function (t) {
    t.plan(4);
    var testAgent = {foo: 'bar'};
    var agents = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'agent', 'recieved correct url');
        t.equals(options.method, 'POST', 'is a POST request');
        t.equals(options.json, testAgent, 'recieved correct agent data');
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    agents.create(testAgent);
});

test('agents.create agent is created callback used', function (t) {
    t.plan(2);
    var testAgent = {foo: 'bar'};
    var agents = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'agent', 'recieved correct url');
        callback();
    });

    agents.create(testAgent, function(){
        t.pass('callback used');
    });
});

test('agents.delete agentId is required', function (t) {
    t.plan(1);
    var testAgentId = null;
    var agents = getCleanTestObject();

    agents.delete(testAgentId, function(error){
        t.equal(error.message, 'Agent id is required.', 'correctly errored');
    });
});

test('agents.delete sends correct data', function (t) {
    t.plan(2);
    var testAgentId = 123456;
    var agents = getCleanTestObject(function(options, callback){
        t.equals(options.url, testConfig.url + 'agent/' + testAgentId, 'recieved correct url');
        t.equals(options.method, 'DELETE', 'is a DELETE request');
    });

    agents.delete(testAgentId);
});

test('agents.delete uses default callback', function (t) {
    t.plan(1);
    var testAgentId = 123456;
    var agents = getCleanTestObject(function(options, callback){
        t.equals(callback.toString(), 'function (){}', 'recieved default callback');
    });

    agents.delete(testAgentId);
});