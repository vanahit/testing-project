import React, { Component } from 'react';
import OneQuizQuestion from './containers/QuizCreator/QuestionCreater/QuestionCreater';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <QuestionCreater />
      </div>
    );
  }
}

export default App;
