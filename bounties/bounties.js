var config = require('../config'),
    defaultCallback = function (){},
    bountyUrl = config.url + 'bounties';

module.exports = function(request, wrapCallback){
    return {
        get: function(bountyId, callback){
            if(typeof bountyId === 'function'){
                callback = bountyId;
                bountyId = null;
            }

            var url = bountyUrl;
            if(typeof bountyId === 'string'){
                url += '/' + bountyId;
            }

            request(url, callback ? wrapCallback(callback) : defaultCallback);
        },
        create: function(agent, callback){
            if(!agent){
                return callback(new Error('Agent data is required.'));
            }

            request({url: bountyUrl, method: 'POST', json: agent}, callback ? wrapCallback(callback) : defaultCallback);
        },
        delete: function(bountyId, callback){
            if(!bountyId){
                return callback(new Error('Bounty id is required.'));
            }

            request({url: bountyUrl + '/' + bountyId, method: 'DELETE'}, callback ? wrapCallback(callback) : defaultCallback);
        },
        assign: function(bountyId, agentId, callback){
            if(!bountyId){
                return callback(new Error('Bounty id is required.'));
            }

            if(!agentId){
                return callback(new Error('Account id is required.'));
            }

            request({url: bountyUrl + '/assign', method: 'POST', json: {
                bountyId: bountyId,
                agentId: agentId
            }}, callback ? wrapCallback(callback) : defaultCallback);
        }
    };
};