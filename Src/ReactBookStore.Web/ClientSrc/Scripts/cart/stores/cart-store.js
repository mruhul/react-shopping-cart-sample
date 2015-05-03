var CartDispatcher = require('./../dispatchers/cart-dispatcher');
var CartService = require('./../services/cart-service');
var _ = require('lodash');


CartDispatcher.subscribe('cmd.items.addnew' , function(data, envelope){
	CartService
		.addItem(data.productId, 1)	
		.then(function(){
			CartDispatcher.dispatch('event.items.added', {
					productId: data.productId,
					qty : 1
				});
		});	
});

CartDispatcher.subscribe('cmd.items.remove', function(data, envelope){
	CartService
		.removeItem(data.productId)
		.then(function(result){
        	CartDispatcher.dispatch('event.items.removed', { productId: data.productId });
		});
});

CartDispatcher.subscribe('cmd.items.loadall', function(data, envelope){
	CartService
		.getCart()
		.then(function(data){
			CartStore._cart = data;
			CartDispatcher.dispatch('event.items.loaded', { cart: data });
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
		console.log(productId, this._cart.items,cartItem);

		if(cartItem){
			return cartItem.quantity;
		}

		return 0;
	},
	onItemsLoaded: function(callback){
		return CartDispatcher.subscribe('event.items.loaded', callback).context(this);
	},
	onItemAdded: function(callback){
		return CartDispatcher.subscribe('event.items.added', callback);
	},
	onItemRemoved: function(callback){
		return CartDispatcher.subscribe('event.items.removed', callback);
	}
};



module.exports = CartStore;