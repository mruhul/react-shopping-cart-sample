var React = require('react');
var CartStore = require('./../stores/cart-store');
var ProductStore = require('./../../product-list/stores/product-list-store');

var CartStatus = React.createClass({
	render: function(){
		var html = <span/>;

		if(this.props.qty > 0){
			html = (
				<div className="cart-status"><span className="badge">
					<i className="glyphicon glyphicon-shopping-cart"></i> {this.props.qty}</span>
				</div>
			);
		}

		return html;
	}
});

module.exports = CartStatus;