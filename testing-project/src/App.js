import React, { Component } from 'react';
import OneQuizQuestion from './containers/QuizCreator/OneQuizQuestion';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <OneQuizQuestion />
      </div>
    );
  }
}

export default App;
