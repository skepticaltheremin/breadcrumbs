var React = require('react');

var Main = React.createClass({
  render: function(){
    return (
      <div className="main-container">
        <nav className="navbar navbar-fixed-top navbar-inverse" role="navigation" >
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <div className="container">
              <div className="navbar-header"><a href="#map" className="navbar-brand" > Breadcrumbs </a></div>
              <div className="navbar-header"><a href="#login" className="navbar-brand"> Login </a></div>
              <div className="navbar-header"><a href="#signup" className="navbar-brand">Signup </a></div>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Main;