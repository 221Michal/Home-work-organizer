import React, { Component } from 'react';
import callApi from "../utils/api";
import './App.css';

class App extends Component {
  start() {
    console.log("asd")
    callApi('user/login', 'post', { email: 'md@email.pl', password: 'asd' })

  }
  render() {
    return (
      <div className="App">
      {this.start()}
      witamy w react!!!
      </div>
    );
  }
}

export default App;
