module.exports = function(apiKey){
    var request = require('request');

    request = request.defaults({
        headers: {
            'x-referit-apikey' : apiKey
        }
    });

    function wrapCallback(callback){
        return function (error, response, data){
            if(error || response.statusCode >= 400){
                return callback(error || data.errors);
            }

            callback(null, data);
        };
    }

    return {
        agents: require('./agents/agents')(request, wrapCallback),
        bounties: require('./bounties/bounties')(request, wrapCallback)
    };
};

