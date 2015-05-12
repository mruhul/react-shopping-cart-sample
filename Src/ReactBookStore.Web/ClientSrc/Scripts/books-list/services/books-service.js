var qwest = require('qwest');

var BooksService = {
	getByCategory: function(category){
		return qwest.get('/api/v1/books/' + category);
	}
};

module.exports = BooksService;