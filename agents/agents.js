var config = require('../config'),
    defaultCallback = function (){},
    agentUrl = config.url + 'agents';

module.exports = function(request, wrapCallback){
    return {
        get: function(agentId, callback){
            if(typeof agentId === 'function'){
                callback = agentId;
                agentId = null;
            }

            var url = agentUrl;
            if(typeof agentId === 'string'){
                url += '/' + agentId;
            }

            request(url, callback ? wrapCallback(callback) : defaultCallback);
        },
        create: function(agent, callback){
            if(!agent){
                return callback(new Error('Agent data is required.'));
            }

            if(!callback){
                callback = defaultCallback;
            }

            request({url: agentUrl, method: 'POST', json: agent}, callback ? wrapCallback(callback) : defaultCallback);
        },
        delete: function(agentId, callback){
            if(!agentId){
                return callback(new Error('Agent id is required.'));
            }

            if(!callback){
                callback = defaultCallback;
            }

            request({url: agentUrl + '/' + agentId, method: 'DELETE'}, callback ? wrapCallback(callback) : defaultCallback);
        }
    };
};