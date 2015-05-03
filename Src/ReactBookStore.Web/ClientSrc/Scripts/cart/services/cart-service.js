var qwest = require('qwest');

var CartService = {
	getCart: function(){
		return qwest.get('/api/v1/cart');
	},
	addItem: function(bookId, qty){
		return qwest.post('/api/v1/cart/books/' + bookId, { qty : qty });
	},
	removeItem: function(bookId){
		return qwest.delete('/api/v1/cart/books/' + bookId);
	}
};

module.exports = CartService;