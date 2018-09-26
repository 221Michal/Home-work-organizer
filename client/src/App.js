import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from './utils/actions/User';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log("asd")
    this.props.userLogin('md@email.pl', 'asd')
  }
  render() {
    return (
      <div className="App">
        witamy w react!!!
      </div>
    );
  }
}

function mapStateToProps(store) {
  console.log(store)
  return {
    user: store.User,
  };
}
const mapDispatchToProps = {
  userLogin,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
