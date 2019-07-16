import React, { Component } from 'react';
import { Checkbox, Radio } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">WorldCup 2018</a>
          </div>
        </nav>

        <div className="container mt-3">
          <Checkbox>顯示紅牌</Checkbox>
          <Checkbox>顯示黃牌</Checkbox>
          <Radio.Group defaultValue="{0}">
            <Radio.Button value="{0}">簡體</Radio.Button>
            <Radio.Button value="{1}">繁體</Radio.Button>
            <Radio.Button value="{2}">English</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  }
}

export default App;