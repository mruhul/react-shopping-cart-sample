var React = require('react');
var Reflux = require('reflux');
var CategoryStore = require('./../stores/category-store');
var CategoryMenuItem = require('./category-menu-item.react');


var CategoryMenu = React.createClass({
	mixins: [
		Reflux.listenTo(CategoryStore,"onChanged")
	],
	onChanged: function(){
		this.setState({ data: CategoryStore.getCategories() });
	},
	getInitialState: function(){
		return {
			data: CategoryStore.getCategories()
		};
	},
	render: function(){
		var html = this.state.data.map(function(item){
			return (
				<CategoryMenuItem  isSelected = { item.isSelected } name={ item.name }/>
			);
		});

		return (
			<div className="category-menu">
				{html}
			</div>
		);
	}
});

module.exports = CategoryMenu;