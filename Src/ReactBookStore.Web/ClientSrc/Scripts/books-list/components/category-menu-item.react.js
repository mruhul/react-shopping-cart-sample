var React = require('react');
var Reflux = require('reflux');
var CategoryActions = require('./../actions/category-actions');

var CategoryMenuItem = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		CategoryActions.select(this.props.name);
	},
	render: function(){
		return (
			<a href="#" className={ this.props.isSelected ? 'selected' : '' } onClick={this.handleClick}>
				{this.props.name}
			</a>
		);
	}
});

module.exports = CategoryMenuItem;