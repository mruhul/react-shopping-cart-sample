var React = require('react');
var AddToCartBtn = require('./../../cart/components/add-to-cart-button');
var CartStatus = require('./../../cart/components/cart-status.react');
var FormatPrice = require('./../../common/components/format-price.react');

var ProductRow = React.createClass({
	render: function(){
		return (
			<div className="book-item col-xs-4">
            <figure>
                    <a href="#">
                        <img src={this.props.item.photoUrl} />
                    </a>
                    <figcaption>
                        <a href="#">{this.props.item.title}</a>
                    </figcaption>
                    <CartStatus qty={this.props.item.cartQty }/>                    
            </figure>

            <div className="row">
                <div className="col-xs-4">
                	<FormatPrice cssClass="price" value={this.props.item.price}/>
                </div>
                <div className="col-xs-8">
                    <AddToCartBtn text="Add to cart" productId={this.props.item.id}/>
                </div>
            </div>
            </div>
		);
	}
});

module.exports = ProductRow;