var Reflux = require('reflux');
var React = require('react');
var ProductService = require('./product-list/services/product-service');
var FormatPrice = require('./common/components/format-price.react');

var Actions = Reflux.createActions([
	"loadBooks",
	"removeBooks"
]);

var  ProductStore = Reflux.createStore({
	_data : [],

	init: function(){
		this.listenToMany(Actions)
	},
	getProducts: function(){
		return this._data;
	},
	onLoadBooks: function(category){
		ProductService
			.getByCategory(category || 'Children')
			.then(function(response){

				this._data = response;
				this.trigger(response);
			
			}.bind(this));
	}
});

var ProductList = React.createClass({
	mixins: [
		Reflux.listenTo(ProductStore,"onProductsChanged")
	],
	
	getInitialState: function(){
		return {
			products: []
		}
	},
	
	componentDidMount: function(){
		Actions.loadBooks('Food');
	},
	
	onProductsChanged: function(response){
		this.setState({ products: ProductStore.getProducts() });
	},
	
	render: function(){
		var html = this.state.products.map(function(item){
			return (
				<ProductRow data={item}/>
			);
		});

		return (
			<table className="table">
				{ html }
			</table>
		);
	}
});

var ProductRow = React.createClass({
	render: function(){
		return (
			<tr>
				<td>
					<h2>{ this.props.data.title }</h2>
					<span className="price"><FormatPrice value={ this.props.data.price }/></span>
					<button className="btn">Remove</button>
				</td>
			</tr>
		);
	}
});


React.render(
	<ProductList/>,
	document.getElementById('product-list')
);
