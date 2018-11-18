import React, { Component } from 'react';
import TestCreater from './containers/QuizCreator/TestCreater';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">

        <div class='test-creater'>
          <TestCreater />
        </div>
      </div>
    );
  }
}

export default App;
