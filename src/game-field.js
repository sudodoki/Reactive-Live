/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Cell = require('./game-single-cell');
var Field = React.createClass({
        mixins: [require('./game-core-mixin')],
        getGameInstance: function(){
          return this.props.game;
        },
        cycleState: function(x, y) {
          return this.getGameInstance().cycleXY(x, y);
        },
        render: function() {
          var formCellRow = (function formCellRow(maxX, currentY, cells) {
            var row = [];
            for (var x = 0; x < maxX; x++) {
              row.push(<Cell
                          onClick={this.cycleState.bind(this, x, currentY)}
                          key={x}
                          state={cells[x + currentY * maxX].state}
                        />)
            }
            return row;
          }).bind(this)

          var formRows = (function formRows(maxX, maxY, cells) {
            var rows = []
            for (var y = 0; y < maxY; y++) {
              rows.push(<tr key={y}>{formCellRow(maxX, y, cells)}</tr>)
            }
            return rows;
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
