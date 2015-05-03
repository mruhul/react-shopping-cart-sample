var postal = require('postal');
var channel = postal.channel('products');

var ProductDispatcher = {
	dispatch: function(cmd, data){
		channel.publish(cmd, data);
	},
	subscribe: function(evnt, callback){
		return channel.subscribe(evnt, callback);
	}
};

module.exports = ProductDispatcher;