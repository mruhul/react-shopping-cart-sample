var CartDispatcher = require('./../dispatchers/cart-dispatcher');


var CartActions = {
	addItem : function(productId, qty){
		CartDispatcher.dispatch('cmd.items.addnew', {
			productId: productId,
			qty: qty
		});
	},
	removeItem: function(productId){
		CartDispatcher.dispatch('cmd.items.remove', {
			productId: productId
		});
	},
	loadItems: function(){
		CartDispatcher.dispatch('cmd.items.loadall', {});
	}
};

module.exports = CartActions;