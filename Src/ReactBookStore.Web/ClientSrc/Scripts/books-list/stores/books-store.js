var Reflux = require('reflux');
var BooksActions = require('./../actions/books-actions');
var BooksService = require('./../services/books-service');
var CategoryStore = require('./category-store');

var BooksStore = Reflux.createStore({
	_data: [],

	init: function(){
		this.listenToMany(BooksActions);
		this.listenTo(CategoryStore, "onCategoryChanged");
	},
	onCategoryChanged: function(){
		var category = CategoryStore.getSelectedCategory();
		this.onLoadBooks(category.name);
	},
	onLoadBooks: function(category){
		console.log('loading ')
		BooksService.getByCategory(category || 'Children')
			.then(function(response){
				console.log(response);
				this._data = response;
				this.trigger();
			}.bind(this));
	},
	getBooks: function(){
		return this._data;
	}
});

module.exports = BooksStore;