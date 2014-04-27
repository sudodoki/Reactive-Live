/**
 * @jsx React.DOM
 */

var React = require('react');

var colors = {
  'alive': '#00FF00',
  'dead': '#FF0000',
  'occupied': '#CCCCCC',
  'empty': '#AAAAAA'
};
var Cell = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState){
    return this.props.state !== nextProps.state;
  },
  render: function() {
    return (
      <td
        onClick={this.props.onClick}
        style={{backgroundColor: colors[this.props.state]}}>
      </td>
    );
  }

});

module.exports = Cell;