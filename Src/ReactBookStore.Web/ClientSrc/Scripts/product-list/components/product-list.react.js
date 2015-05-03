var React  = require('react');
var ProductRow = require('./product-row.react');
var ProductListActions = require('./../actions/product-list-actions');
var ProductListStore = require('./../stores/product-list-store');

var ProductList = React.createClass({
	_onLoaded: null,
	getInitialState: function(){
		return {
			items : []
		}
	},
	componentWillMount: function(){
		this._onLoaded = ProductListStore.onLoaded(this._onChanged);
	},
	componentDidMount: function(){
		ProductListActions.loadProducts();
	},
	componentWillUnmount: function(){
		_onLoaded.unsubscribe();
	},
	_onChanged : function(data){
		console.log(data);
		this.setState({ items: ProductListStore.getProducts() });
	},
	render: function(){

		var productRowHtml = this.state.items.map(function(item){
			return (
				<ProductRow item={ item }/>
			);
		});


		return (
			<div className="product-list">
				{ productRowHtml }
			</div>
		);
	}
});

module.exports = ProductList;