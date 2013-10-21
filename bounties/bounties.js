var config = require('../config'),
    defaultCallback = function (){},
    bountyUrl = config.url + 'bounties';

module.exports = function(request){
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

            if(!callback){
                callback = defaultCallback;
            }

            request(url, callback);
        },
        create: function(agent, callback){
            if(!agent){
                return callback(new Error('Agent data is required.'));
            }

            if(!callback){
                callback = defaultCallback;
            }

            request({url: bountyUrl, method: 'POST', json: agent}, callback);
        },
        delete: function(bountyId, callback){
            if(!bountyId){
                return callback(new Error('Agent id is required.'));
            }

            if(!callback){
                callback = defaultCallback;
            }

            request({url: bountyUrl + '/' + bountyId, method: 'DELETE'}, callback);
        }
    };
};