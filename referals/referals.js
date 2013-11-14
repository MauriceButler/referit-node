var config = require('../config'),
    defaultCallback = function (){},
    referalUrl = config.url + 'referals';

module.exports = function(request, wrapCallback){
    return {
        confirm: function(transmissionId, callback){
            if(!transmissionId || typeof transmissionId !== 'string'){
                return callback(new Error('Transmission Id is required.'));
            }

            var url = referalUrl + '/' + transmissionId;

            request({url: url, method: 'POST', json: {transmissionId: transmissionId}}, callback ? wrapCallback(callback) : defaultCallback);
        }
    };
};