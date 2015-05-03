var React = require('react');
var ProductList = require('./product-list/components/product-list');
var CategoryMenu = require('./product-list/components/category-menu.react');
var Cart = require('./cart/components/cart-component');


React.render(
	<ProductList/>,
	document.getElementById('product-list')
);


React.render(
	<CategoryMenu/>,
	document.getElementById('category-menu')
);


React.render(
        <Cart /> ,
    document.getElementById('cart')
);