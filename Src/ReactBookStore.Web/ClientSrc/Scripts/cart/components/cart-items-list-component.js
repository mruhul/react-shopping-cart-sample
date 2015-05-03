var React = require('react');
var CartItem = require('./cart-item-component');
var numeral = require('numeral');
var FormatPrice = require('./../../common/components/format-price.react');

var CartItemsList  = React.createClass({
	render: function(){
		var html = this.props.cart.items.map(function(item){
    		return (
    			<CartItem item={item}/>
			);
    	});

		return (
			<table className="table table-hover">
				<tbody>
				<tr>
					<th>Title</th>
					<th>Qty</th>
					<th className="align-right">Subtotal</th>
					<th>&nbsp;</th>
				</tr>
				{ html }
				<tr>
					<td colSpan="2" className="align-right">Total:</td>
					<td className="align-right"><FormatPrice value={this.props.cart.total}/></td>
					<td>&nbsp;</td>
				</tr>
				</tbody>
			</table>
		);
	}
});

module.exports = CartItemsList;