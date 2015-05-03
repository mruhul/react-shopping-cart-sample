var React = require('react');
var CartActions = require('./../actions/cart-actions');
var CartStore = require('./../stores/cart-store.js');
var FormatPrice = require('./../../common/components/format-price.react');

var CartItem = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		CartActions.removeItem(this.props.item.book.id);
	},
	componentWillMount: function(){
		CartStore.onItemRemoved(this._callback);
	},
	componentWillUnmount: function(){
		//CartStore.offItemRemoved();
	},
	_callback : function(){
		CartActions.loadItems();
	},
	render: function(){
		return (
			<tr>
				<td>{ this.props.item.book.title }</td>
				<td>{ this.props.item.quantity }</td>
				<td className="align-right"><FormatPrice value={this.props.item.subtotal}/></td>
				<td><a href="#" onClick={this.handleClick}><i className="glyphicon glyphicon-remove"></i></a></td>
			</tr>
		);
	}
});

module.exports = CartItem;