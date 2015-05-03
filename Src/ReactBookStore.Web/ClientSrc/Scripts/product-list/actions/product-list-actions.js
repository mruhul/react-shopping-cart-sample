var ProductDispatcher = require('./../dispatchers/product-dispatcher');

var ProductListActions = {
	loadProducts : function(category){		
		ProductDispatcher.dispatch('cmd.items.loadall',{
			category: category || 'Children'
		});
	},
	selectCategory: function(category){
		ProductDispatcher.dispatch('cmd.categories.select', category);
	}
};

module.exports = ProductListActions;