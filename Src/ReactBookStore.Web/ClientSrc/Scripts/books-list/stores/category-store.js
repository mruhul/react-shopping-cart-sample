var Reflux = require('reflux');
var _ = require('lodash');
var CategoryActions = require('./../actions/category-actions');
var BooksActions = require('./../actions/books-actions');

var CategoryStore = Reflux.createStore({

	_data: [
		{name:'Children', isSelected: true},
		{name:'Food'}
	],

	init: function(){
		this.listenToMany(CategoryActions);
	},
	onSelect: function(name){
		_.each(this._data, function(item){
			item.isSelected = (item.name == name);
		});

		this.trigger();
	},

	getCategories: function(){
		return this._data;
	},

	getSelectedCategory: function(){
		return _.find(this._data, function(item){
			return item.isSelected;
		});
	}
});

module.exports = CategoryStore;