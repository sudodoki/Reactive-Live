/* global module */
module.exports = {
  componentDidMount: function() {
  // Whenever there may be a change in the game data, trigger a reconcile.
    this.getGameInstance().on('update', this.forceUpdate.bind(this, null));
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.game !== this.getGameInstance()) {
      prevProps.game.removeAllListeners('update')
      this.getGameInstance().on('update', this.forceUpdate.bind(this, null));
    }
  },
  componentWillUnmount: function() {
  // Ensure that we clean up any dangling references when the component is
  // destroyed.
    this.getGameInstance().removeAllListeners('update');
  }
};