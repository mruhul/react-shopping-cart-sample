var React = require('react');
var numeral = require('numeral');

var FormatPrice = React.createClass({
	propTypes: {
		value: React.PropTypes.number.isRequired,
		cssClass: React.PropTypes.string
	},
	getDefaultProps: function(){
		return {
			cssClass : ''
		}
	},
	render: function(){
		return (
			<span className={ this.props.cssClass }>
				{numeral(this.props.value).format('$0,0.00')}
			</span>
		);
	}
});

module.exports = FormatPrice;