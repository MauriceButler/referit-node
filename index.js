module.exports = function(apiKey){
    var request = require('request');

    request = request.defaults({
        headers: {
            'x-referit-apikey' : apiKey
        }
    });

    function wrapCallback(callback){
        return function (error, response, data){
            var jsonData = data && JSON.parse(data);
            if(error || response.statusCode >= 400){
                return callback(error || jsonData.errors);
            }

            callback(null, jsonData);
        };
    }

    return {
        agents: require('./agents/agents')(request, wrapCallback),
        bounties: require('./bounties/bounties')(request, wrapCallback)
    };
};

