var ProductDispatcher = require('./../dispatchers/product-dispatcher');
var CartStore = require('./../../cart/stores/cart-store');
var ProductService = require('./../services/product-service');

var cartChannel = postal.channel('cart');
var _ = require('lodash');

ProductDispatcher.subscribe('cmd.items.loadall', function(data, envelope){
	ProductService.getByCategory(data.category)
		.then(function(data){
			ProductListStore._items = data;
			ProductListStore._loadCartQty(ProductListStore._items);	
			ProductDispatcher.dispatch('event.items.loaded', { items : ProductListStore._items });			
		});
});

ProductDispatcher.subscribe('cmd.categories.select', function(data, envelope){
	
	var category = _.find(ProductListStore.getCategories(), function(item){
		return item.name == data.name;
	});

	if(category.isSelected) return;
	var categories = ProductListStore.getCategories();
	for (var i = categories.length - 1; i >= 0; i--) {
		categories[i].isSelected = (category.name == categories[i].name);
	};	

	ProductListStore._categories = categories;

	ProductListStore._selectedCategoryName = category.name;

	ProductDispatcher.dispatch('event.categories.selected', category);
	ProductDispatcher.dispatch('cmd.items.loadall', {category : category.name});
});

cartChannel.subscribe('event.items.loaded', function(data){
	ProductListStore._loadCartQty(ProductListStore._items);	
	ProductDispatcher.dispatch('event.items.loaded', { items : ProductListStore._items });	
});


var ProductListStore = {
	_items : [],
	_selectedCategoryName: 'Children', 
	_categories: [ 
				{ name: 'Children', isSelected: true },
				{ name: 'Food', isSelected: false }
			],
	getCategories: function(){
		return this._categories;
	},

	getProducts: function(){
		return this._items;
	},
	getProductById: function(id){
		console.log(this._items, id);
		return _.find(this._items, function(item){
			return item.id == id;
		});
	},
	onLoaded : function(callback){
		return ProductDispatcher.subscribe('event.items.loaded', callback);
	},
	onCategorySelected: function(callback){
		return ProductDispatcher.subscribe('event.categories.selected', callback);
	},
	_loadCartQty: function(items){
		_.forEach(items, function(item){
			item.cartQty = CartStore.getQuantity(item.id);
		});
	}
};

module.exports = ProductListStore;