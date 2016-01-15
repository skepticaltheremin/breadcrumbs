var React = require('react');
var helpers = require('../utils/helpers');

var SearchUser = React.createClass({
  getInitialState: function() {
    return {username: ''};
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    if (!username) {
      return;
    }
    helpers.getAllBreadCrumbs(username, function(data){
      console.log(data);
    });
    this.setState({username: ''});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = SearchUser;