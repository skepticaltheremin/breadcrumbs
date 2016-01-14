var React = require('react');
var helpers = require('../utils/helpers');

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },
  handleUsernameChange: function(event) {
    this.setState({username: event.target.value});
  },
  handlePasswordChange: function(event){
    this.setState({password: event.target.value});
  },
  login: function(e){
    e.preventDefault();
    var self = this;
    console.log("Login called:", this.state.username, this.state.password);
    helpers.login(this.state.username,this.state.password);
    this.props.loginUser(this.state.username);
  },

  render: function(){
    return(
      <div>
         <h2>Login</h2>
         <form  onSubmit={this.login} >
           <div>
             <label htmlFor="username">Username:</label>
             <input onChange={this.handleUsernameChange} value={this.state.username} id="username" type="text" name="username" />
           </div>
           <div>
             <label htmlFor="password">Password:</label>
             <input onChange={this.handlePasswordChange} value={this.state.password} id="password" type="password" name="password" />
           </div>
           <div>
             <input className="btn btn-primary" type="submit" value="Sign up" />
           </div>
       </form>
       <p>
         <a href="#login">Login to your account &rarr;</a>
       </p>
      </div>

    )
  }
});

module.exports = Login;