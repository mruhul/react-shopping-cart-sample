var CartDispatcher = require('./../dispatchers/cart-dispatcher');
var CartService = require('./../services/cart-service');
var CartConstants = require('./../constants/cart-constants');
var _ = require('lodash');


CartDispatcher.subscribe(CartConstants.CART_CMD_ADD_NEW , function(data, envelope){
	CartService
		.addItem(data.productId, 1)	
		.then(function(){
			CartDispatcher.dispatch(CartConstants.CART_EVENT_ITEM_ADDED, {
					productId: data.productId,
					qty : 1
				});
		});	
});

CartDispatcher.subscribe( CartConstants.CART_CMD_REMOVE, function(data, envelope){
	CartService
		.removeItem(data.productId)
		.then(function(result){
        	CartDispatcher.dispatch(CartConstants.CART_EVENT_ITEM_REMOVED, { productId: data.productId });
		});
});

CartDispatcher.subscribe( CartConstants.CART_CMD_LOAD_ALL, function(data, envelope){
	CartService
		.getCart()
		.then(function(data){
			CartStore._cart = data;
			CartDispatcher.dispatch(CartConstants.CART_EVENT_ITEMS_LOADED, { cart: data });
		});
});


var CartStore = {
	_cart : {},

	getCart: function(){
		return this._cart;
	},
	getQuantity: function(productId){
		var cartItem = _.find(this._cart.items, function(item){
			return item.book.id == productId;
		});

		if(cartItem){
			return cartItem.quantity;
		}

		return 0;
	},
	onItemsLoaded: function(callback){
		return CartDispatcher.subscribe(CartConstants.CART_EVENT_ITEMS_LOADED, callback).context(this);
	},
	onItemAdded: function(callback){
		return CartDispatcher.subscribe(CartConstants.CART_EVENT_ITEM_ADDED, callback);
	},
	onItemRemoved: function(callback){
		return CartDispatcher.subscribe(CartConstants.CART_EVENT_ITEM_REMOVED, callback);
	}
};



module.exports = CartStore;