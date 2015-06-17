import React from 'react/addons';
import dashboard from './js/components/dashboard.jsx';
import create_user from './js/components/create_user.jsx';
import log_in from './js/components/log_in.jsx';
import Router, { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

var request = require('superagent');
var constants = require('./js/constants/login_constants');
var Fluxxor = require('fluxxor');
var UserStore = require('./js/stores/user_stores');
var Users = require('./js/components/users.jsx');

var actions = {
  login: function(user) {
    this.dispatch(constants.LOGIN, user);
  },

  logout: function() {
    this.dispatch(constants.LOGOUT);
  },

  createUser: function(user) {
    this.dispatch(constants.CREATE_USER, user);
  },
};

var stores = {
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore')],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState()
    };
  },
  render: function() {
    return (
      <main>
      <h1>WADDUP TURTLE</h1>
        <Users eat={this.state.userData.eat}/>
      <RouteHandler/>
      </main>
    )
  }
});

// Declare our routes
var routes = (
  <Route handler={App}>
    <Route path="/dashboard" handler={dashboard}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root flux={flux}/>, document.body);
});
