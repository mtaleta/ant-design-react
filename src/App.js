import React, { Component } from 'react';
import { Checkbox, Radio, Table } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

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
          <div className="filter my-3">
            <Checkbox>顯示紅牌</Checkbox>
            <Checkbox>顯示黃牌</Checkbox>

            <Radio.Group defaultValue="{0}">
              <Radio.Button value="{0}">簡體</Radio.Button>
              <Radio.Button value="{1}">繁體</Radio.Button>
              <Radio.Button value="{2}">English</Radio.Button>
            </Radio.Group>
          </div>
          <Table dataSource={dataSource} columns={columns} size="middle" pagination={false} />
        </div>
      </div>
    );
  }
}

export default App;