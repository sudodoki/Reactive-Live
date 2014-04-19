/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Field = React.createClass({
        mixins: [require('./game-core-mixin')],
        getGameInstance: function(){
          return this.props.game;
        },
        cycleState: function(x, y) {
          return this.getGameInstance().cycleXY(x, y);
        },
        render: function() {
          var self = this;
            var colors = {
                'alive': '#00FF00',
                'dead': '#FF0000',
                'occupied': '#CCCCCC',
                'empty': '#AAAAAA'
            };
            var formCellRow = (function formCellRow(maxX, currentY, cells) {
              return Array.apply(null, {length: maxX})
                .map(function(v,x){
                  return <td
                            onClick={self.cycleState.bind(self, x, currentY)}
                            key={x}
                            style={{backgroundColor: colors[cells[x + currentY * maxX].state]}}>
                          </td>
                });
            }).bind(this)

            var formRows = (function formRows(maxX, maxY, cells) {
              return Array.apply(null, {length: maxY})
                .map(function(v,y){return <tr key={y}>{formCellRow(maxX, y, cells)}</tr>})
            }).bind(this)
            var game = this.getGameInstance();
            return <table>
                  <tbody>
                  {formRows(game.width, game.height, game.cells)}
                  </tbody>
                </table>
  }
})
module.exports = Field
