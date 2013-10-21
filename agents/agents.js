var config = require('../config'),
    defaultCallback = function (){},
    agentUrl = config.url + 'agent';

module.exports = function(request){
    return {
        get: function(agentId, callback){
            if(typeof agentId === 'function'){
                callback = agentId;
                agentId = null;
            }

            if(typeof agentId === 'string'){
                agentUrl += '/' + agentId;
            }

            if(!callback){
                callback = defaultCallback;
            }

            request(agentUrl, callback);
        },
        create: function(agent, callback){
            if(!agent){
                return callback(new Error('Agent data is required.'));
            }

            if(!callback){
                callback = defaultCallback;
            }

            request({url: agentUrl, method: 'POST', json: agent}, callback);
        },
        delete: function(agentId, callback){
            if(!agentId){
                return callback(new Error('Agent id is required.'));
            }

            agentUrl += '/' + agentId;

            if(!callback){
                callback = defaultCallback;
            }

            request({url: agentUrl, method: 'DELETE'}, callback);
        }
    };
};