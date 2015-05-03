var CartDispatcher = require('./../dispatchers/cart-dispatcher');
var CartConstants = require('./../constants/cart-constants');


var CartActions = {
	addItem : function(productId, qty){
		CartDispatcher.dispatch(CartConstants.CART_CMD_ADD_NEW, {
			productId: productId,
			qty: qty
		});
	},
	removeItem: function(productId){
		CartDispatcher.dispatch(CartConstants.CART_CMD_REMOVE, {
			productId: productId
		});
	},
	loadItems: function(){
		CartDispatcher.dispatch(CartConstants.CART_CMD_LOAD_ALL, {});
	}
};

module.exports = CartActions;