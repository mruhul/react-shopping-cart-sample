var React = require('react');
var Reflux = require('reflux');
var BooksStore = require('./../stores/books-store');
var BookRow = require('./book-row.react');
var BooksActions = require('./../actions/books-actions');

var BooksList = React.createClass({
	getInitialState: function(){
		return {
			items: []
		}
	},

	mixins: [
		Reflux.listenTo(BooksStore, "onBooksChanged")
	],

	componentDidMount: function(){
		BooksActions.loadBooks('Children');
	},

	onBooksChanged : function(){
		this.setState({ items: BooksStore.getBooks() });
	},

	render: function(){
		var html = this.state.items.map(function(item){
			return (
				<BookRow item={ item }/>
			);
		});

		return (
			<div className="product-list">
				{ html }
			</div>
		);
	}
});


module.exports = BooksList;

