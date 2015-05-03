var React = require('react');
var CartActions = require('./../actions/cart-actions');

var AddToCartBtn = React.createClass({
	handleClick : function(e){
		e.preventDefault();
		CartActions.addItem(this.props.productId, 1);
	},
	render: function(){
		return (
			<a href="#" className="add-to-cart" onClick={this.handleClick}><i title="Add to Cart" className="glyphicon glyphicon-plus-sign"></i> Add to Cart</a>
		);
	}
});

module.exports = AddToCartBtn;