var React = require('react');
var EmptyCart = require('./empty-cart.react');
var CartItemsList = require('./cart-items-list.react');
var CartStore = require('./../stores/cart-store');
var CartActions = require('./../actions/cart-actions');

var postal = require('postal');

var Cart = React.createClass({
	getInitialState: function(){
		return{
			cart: null,
			loading: true
		}
	},
	componentWillMount: function(){	
		CartStore.onItemsLoaded(this._onItemsLoaded);
		CartStore.onItemAdded(this._onChange);
	},
	componentDidMount: function(){
		CartActions.loadItems();
	},
	componentDidUnmount: function(){
		//CartStore.offItemsLoaded();
		//CartStore.offItemsAdded();
	},
    _onItemsLoaded: function(data){
        this.setState({ cart: CartStore.getCart(), loading: false });
    },
	_onChange : function(data){
        this.setState({ loading: true });
        CartActions.loadItems();
	},
	_getLoadingCss: function(){
		return this.state.loading ? 'loading' : '';
	},
    render: function() {
    	
    	var contentHtml = '';

    	if(!this.state.loading)
    	{
    		if(!this.state.cart || this.state.cart.isEmpty){
    			contentHtml = <EmptyCart/>
    		}
            else{
                contentHtml = <CartItemsList cart={ this.state.cart }/>
            }
    	}

        return (
            <div className="cart-component">
                <h2><i className="glyphicon glyphicon-shopping-cart"></i> Cart Details</h2>
                <div className={this._getLoadingCss()}>
            		{ contentHtml }
                </div>
            </div>
        );
    }
});

module.exports = Cart;