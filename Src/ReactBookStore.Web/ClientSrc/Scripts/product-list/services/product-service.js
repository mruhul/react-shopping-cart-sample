var qwest = require('qwest');

var ProductService = {
	getByCategory: function(category){
		return qwest.get('/api/v1/books/' + category);
	}
};

module.exports = ProductService;