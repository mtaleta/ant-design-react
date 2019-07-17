import React, { Component } from 'react';
import { Checkbox, Radio, Table, Badge } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';



class App extends Component {
  //保存資料
  state = {
    data: [],
    loading: false,
    league: 0,
    showRed: true,
    showYellow: true
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

  handleShowRedChange = (e) => {
    this.setState({
      showRed: e.target.checked
    })
  }

  handleShowYellowChange = (e) => {
    this.setState({
      showYellow: e.target.checked
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
        render: (home, record) =>
          <div>
            <Badge className="mr-1" count={record.homeYellow} style={{ display: this.state.showYellow ? 'block' : 'none', borderRadius: 0, backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
            <Badge className="mr-1" count={record.homeRed} style={{ display: this.state.showRed ? 'block' : 'none', borderRadius: 0, backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
            <span>{home[this.state.league]}</span>
          </div>
      },
      {
        title: '全場比分',
        dataIndex: 'score',
        render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
      },
      {
        title: '客隊',
        dataIndex: 'guest',
        render: (guest, record) =>
          <div>
            <span>{guest[this.state.league]}</span>
            <Badge className="ml-1" count={record.guestYellow} style={{ display: this.state.showYellow ? 'block' : 'none', borderRadius: 0, backgroundColor: 'yellow', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
            <Badge className="ml-1" count={record.guestRed} style={{ display: this.state.showRed ? 'block' : 'none', borderRadius: 0, backgroundColor: 'red', color: '#fff', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
          </div>
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
            <Checkbox checked={this.state.showRed} onChange={this.handleShowRedChange}>顯示紅牌</Checkbox>
            <Checkbox checked={this.state.showYellow} onChange={this.handleShowYellowChange}>顯示黃牌</Checkbox>

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