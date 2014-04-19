/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Logic = require('cell-automata').logic;
const minDelay = 1;
const maxDelay = 1001;
var Control = React.createClass({
  mixins: [require('./game-core-mixin'), React.addons.LinkedStateMixin],
  getGameInstance: function(){
    return this.props.game
  },
  getInitialState: function() {
    var rules = this.getGameInstance().getRules();
    rules.running = false
    rules.duration = 500
    this.rules = rules;
    return rules;
  },
  componentWillUpdate: function(nextProps, nextState) {
    var game = this.getGameInstance();
    if (this.loop) {clearTimeout(this.loop);}
    if (nextState.running) {
      this.loop = setTimeout(function() {
        game.setState(Logic.computeNextState(game, game.getRules()))
      }, maxDelay - nextState.duration)
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.rules !== prevState) {
      this.rules = prevState;
      this.getGameInstance().setRules(prevState)
    }
  },
  componentWillUnmount: function(){
    clearTimeout(this.loop)
  },
  render: function() {
    return (
      <form>
      <fieldset>
        <legend>Controls</legend>
        Run:&nbsp;
        <label className={'running-' + this.state.running}>
          <input type='checkbox' checkedLink={this.linkState('running')} />
        </label>
        <br/>
        Speed:&nbsp;
        <label>
          slow
          <input type='range' min={Math.max(1, minDelay)} max={maxDelay - 1} valueLink={this.linkState('duration')} />
          fast
        </label>
      </fieldset>
      <fieldset>
        <legend>Rules</legend>

        <label>
          Account for diagonals:
          <input type='checkbox' checkedLink={this.linkState('adjacent')} />
        </label><br/>
        <label>
          How many cells are too many (overcrowdedAmount)&nbsp;: {this.state.overcrowdedAmount}
          <input type='range' min='1' max='8' valueLink={this.linkState('overcrowdedAmount')} />
        </label><br/>
        <label>
          How many cells good enough to create new (favorableAmount)&nbsp;: {this.state.favorableAmount}
          <input type='range' min='1' max='8' valueLink={this.linkState('favorableAmount')} />
        </label><br/>
        <label>
          How many cells to feel lonely & die (lonelyAmount)&nbsp;: {this.state.lonelyAmount}
          <input type='range' min='1' max='8' valueLink={this.linkState('lonelyAmount')} />
        </label><br/>
        <label>
          Is death instant? { this.state.instantDeath ? 'Yes' : 'No '}
          <input type='checkbox' checkedLink={this.linkState('instantDeath')} />
        </label><br/>
        <label>
          How long does cell stay dead before clearing space: {this.state.turnsDecompose}
          <input type='range' min='0' max='10' valueLink={this.linkState('turnsDecompose')} />
        </label><br/>
        <label>
          Is wield wrapping? (leaving left side you will enter field from right side) { this.state.wrappingField ? 'Yes' : 'No '}
          <input type='checkbox' checkedLink={this.linkState('wrappingField')} />
        </label><br/>

      </fieldset>
      </form>
    );
  }

});

module.exports = Control;







