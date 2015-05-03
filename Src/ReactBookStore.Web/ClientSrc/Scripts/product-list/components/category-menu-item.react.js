var React = require('react');
var ProductListActions = require('./../actions/product-list-actions');

var CategoryMenuItem = React.createClass({
	handleClick : function(e){
		e.preventDefault();
		ProductListActions.selectCategory(this.props.category);
	},
	getCssClassName: function(){
		return this.props.category.isSelected ? 'selected' : '';
	},
	render: function(){
		return (
			<a href="#" className={this.getCssClassName()} onClick={this.handleClick}>
				{this.props.category.name}
			</a>
		);
	}
});

module.exports = CategoryMenuItem;