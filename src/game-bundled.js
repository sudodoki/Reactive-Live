/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Field = require('./game-field');
var Control = require('./game-control');
var Logic = require('cell-automata').logic;
var GameComponent = React.createClass({
  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number
  },
  componentWillMount: function(){
    var gameInstance = new Logic(this.props.width, this.props.height).setRules({wrappingField: true});
    gameInstance.setStateXY(2, 2, 'alive');
    gameInstance.setStateXY(3, 3, 'alive');
    gameInstance.setStateXY(4, 3, 'alive');
    gameInstance.setStateXY(3, 4, 'alive');
    gameInstance.setStateXY(2, 4, 'alive');

    this.setState({gameInstance: gameInstance});
  },
  componentWillReceiveProps: function(nextProps) {
    // TODO: 
    nextProps.width = parseInt(nextProps.width, 10);
    nextProps.height = parseInt(nextProps.height, 10);
    var newState = JSON.parse(JSON.stringify(nextProps));
    var oldRules = this.state.gameInstance.getRules();
    newState.gameInstance = new Logic(nextProps.width, nextProps.height).setRules(oldRules);
    this.setState(newState);
  },
  render: function() {
    return (
      <div className='large'>
        <Field game = {this.state.gameInstance} />
        <Control game = {this.state.gameInstance} />
      </div>
    );
  }

});

module.exports = GameComponent;



