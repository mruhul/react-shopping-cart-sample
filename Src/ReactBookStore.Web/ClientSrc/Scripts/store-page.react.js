var React = require('react');
var CategoryMenu = require('./books-list/components/category-menu.react');
var BooksList = require('./books-list/components/books-list.react');

React.render(
	<CategoryMenu/>,
	document.getElementById('category-menu')
);

React.render(
	<BooksList/>,
	document.getElementById('product-list')
);