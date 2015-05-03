var React = require('react');
var CategoryMenuItem = require('./category-menu-item.react');
var ProductListStore = require('./../stores/product-list-store');


var CategoryMenu = React.createClass({	
	_onCategorySelectedSubscription = null,

	getInitialState: function(){
		return {
			categories: ProductListStore.getCategories()
		};
	},
	componentWillMount: function(){
		this._onCategorySelectedSubscription = ProductListStore.onCategorySelected(this._changed);
	},
	componentWillUnmount: function(){
		this._onCategorySelectedSubscription.unsubscribe();
	},
	_changed: function(data){
		this.setState({ categories: ProductListStore.getCategories() });
	},
	render: function(){
		var ctl = this;
		var html = this.state.categories.map(function(item){
			return (
				<CategoryMenuItem category={item}/>
			);
		});

		return (
			<div className="category-menu">
            	{ html }
        	</div>
		);
	}
});

module.exports = CategoryMenu;