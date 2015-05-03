var React = require('react');

var EmptyCart = React.createClass({
	render: function(){
		return (
			<div>Your cart is empty.</div>
		);
	}
});

module.exports = EmptyCart;