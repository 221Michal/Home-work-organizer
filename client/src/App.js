import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, userLogOut, userRegister } from './utils/actions/User';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import RegisterForm from './components/register/RegisterForm';
import Home from './screens/home/Home';
import startPage from './screens/startPage/startPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={startPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.User,
  };
}
const mapDispatchToProps = {
  userLogin,
  userLogOut,
  userRegister,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
