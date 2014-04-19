/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Game = require('./game-bundled');
var App = React.createClass({
  handleWidthChange: function(newValue) {
    this.setState({width: parseInt(newValue, 10)})
  },
  handleHeightChange: function(newValue) {
    this.setState({height: parseInt(newValue, 10)})
  },
  getInitialState: function() {
    return {
      width: 20,
      height: 20
    };
  },
  render: function() {
    var heightLink = {
      value: this.state.height,
      requestChange: this.handleHeightChange
    }
    var widthLink = {
      value: this.state.width,
      requestChange: this.handleWidthChange
    }
    return (
      <div>
        Size: 
        <input ref='width'  min='0' max='50' type='number' valueLink={widthLink} /> 
        X
        <input ref='height' min='0' max='50' type='number' valueLink={heightLink} />
        <Game width={this.state.width} height={this.state.height} />
      </div>

    );
  }

});

module.exports = App;