import React, { Component } from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import { Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/AboutUs/" component={AboutUs} />
      </div>
    );
  }
}

export default App;
