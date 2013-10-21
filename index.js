module.exports = function(apiKey){
    var request = require('request');

    request = request.defaults({
        headers: {
            'x-referit-apikey' : apiKey
        }
    });

    return {
        agents: require('./agents/agents')(request)
    };
};

