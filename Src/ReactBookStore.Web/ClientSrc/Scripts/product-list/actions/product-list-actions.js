var ProductDispatcher = require('./../dispatchers/product-dispatcher');
var constants = require('./../constants/product-constants');

var ProductListActions = {
	loadProducts : function(category){		
		ProductDispatcher.dispatch( constants.PRD_CMD_LOAD_ALL,{
			category: category || 'Children'
		});
	},
	selectCategory: function(category){
		ProductDispatcher.dispatch( constants.PRD_CMD_SELECT_CATEGORY , category);
	}
};

module.exports = ProductListActions;