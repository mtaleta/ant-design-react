import React, { Component } from 'react';
import { Checkbox, Radio, Table } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';



class App extends Component {
  //保存資料
  state = {
    data: [],
    loading: false,
    league: 0,
  };

  fetch = () => {
    this.setState({ loading: true })
    reqwest({
      url: '/result.json',
      method: 'get',
      type: 'json',
    }).then(data => {
      this.setState({
        data: data.results,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.fetch();
  }

  handleLangChange = (e) => {
    this.setState({
      league: e.target.value
    })
  }
  render() {
    const columns = [
      {
        title: '賽事',
        dataIndex: 'league',
        render: league => <span>{league[this.state.league]}</span>
      },
      {
        title: '時間',
        dataIndex: 'matchTime',
        render: (value, record) => <span title={record.matchYear + "-" + record.matchDate + " " + record.matchTime}> {record.matchDate + " " + record.matchTime}</span>,
      },
      {
        title: '主隊',
        dataIndex: 'home',
        render: home => <span>{home[this.state.league]}</span>

      },
      {
        title: '全場比分',
        dataIndex: 'score',
        render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
      },
      {
        title: '客隊',
        dataIndex: 'guest',
        render: guest => <span>{guest[this.state.league]}</span>

      },
      {
        title: '半場比分',
        dataIndex: 'halfScore',
        render: (value, record) => <span>{record.homeHalfScore} - {record.guestHalfScore}</span>,

      },
    ];
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

            <Radio.Group defaultValue={this.state.league} onChange={this.handleLangChange}>
              <Radio.Button value={0}>簡體</Radio.Button>
              <Radio.Button value={1}>繁體</Radio.Button>
              <Radio.Button value={2}>English</Radio.Button>
            </Radio.Group>
          </div>
          <Table
            dataSource={this.state.data}
            columns={columns}
            size="middle"
            pagination={false}
            rowKey={record => record.matchId}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default App;