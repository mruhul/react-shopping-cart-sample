var ProductDispatcher = require('./../dispatchers/product-dispatcher');
var CartStore = require('./../../cart/stores/cart-store');
var ProductService = require('./../services/product-service');
var constants = require('./../constants/product-constants');

var _ = require('lodash');

ProductDispatcher.subscribe(constants.PRD_CMD_LOAD_ALL, function(data, envelope){
	ProductService.getByCategory(data.category)
		.then(function(data){
			ProductListStore._items = data;
			ProductListStore._loadCartQty(ProductListStore._items);	
			ProductDispatcher.dispatch( constants.PRD_EVENT_ITEMS_LOADED , { items : ProductListStore._items });			
		});
});

ProductDispatcher.subscribe(constants.PRD_CMD_SELECT_CATEGORY , function(data, envelope){
	
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

	ProductDispatcher.dispatch( constants.PRD_EVENT_CATEGORY_SELECTED, category);
	ProductDispatcher.dispatch(constants.PRD_CMD_LOAD_ALL, {category : category.name});
});


CartStore.onItemsLoaded(function(){	
	ProductListStore._loadCartQty(ProductListStore._items);	
	ProductDispatcher.dispatch(constants.PRD_EVENT_ITEMS_LOADED, { items : ProductListStore._items });
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
		return ProductDispatcher.subscribe(constants.PRD_EVENT_ITEMS_LOADED, callback);
	},
	onCategorySelected: function(callback){
		return ProductDispatcher.subscribe(constants.PRD_EVENT_CATEGORY_SELECTED, callback);
	},
	_loadCartQty: function(items){
		_.forEach(items, function(item){
			item.cartQty = CartStore.getQuantity(item.id);
		});
	}
};

module.exports = ProductListStore;