var React = require('react');

var VoteBtn = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		this.props.handleClick(this.props.value)
	},
	render: function(){
		var css = 'glyphicon ' + this.props.cssClass;

		return (
			<div>
				<a href="#" className={css} onClick={this.handleClick}></a>
			</div>
		);
	}
});

var VoteCount = React.createClass({
	getDefaultProps: function(){
		return {
			value: 0
		}
	},
	render: function(){
		return (
		<span>
			{this.props.value}
		</span>
		);
	}
});

var VoteBox = React.createClass({
	getInitialState: function(){
		return {
			value: 0
		}
	},
	handleClick: function(newValue){
		this.setState({
			value : this.state.value + newValue
		})
	},
	render: function(){
		return (
			<div>
				<h3>Vote here</h3>
				<VoteBtn cssClass='glyphicon-thumbs-up' value={1} handleClick={this.handleClick}/>
				<VoteBtn cssClass='glyphicon-thumbs-down' value={-1} handleClick={this.handleClick}/>
				<VoteCount value={this.state.value}/>
			</div> 
		);
	}
});


React.render(
	<VoteBox/>,
	document.getElementById('demo-container')
);