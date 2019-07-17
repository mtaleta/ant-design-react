import React, { Component } from 'react';
import { Checkbox, Radio, Table, Badge, Menu, Dropdown, Icon, message } from 'antd';
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

  handleOpeation = (type, matchId) => {
    //定位
    let foundIndex = this.state.data.findIndex(x => x.matchId === matchId)
    if (foundIndex !== -1) {
      let currentMatch = this.state.data[foundIndex]
      let currentMatchHome = currentMatch.home[this.state.league]
      let currentMatchGuest = currentMatch.guest[this.state.league]
      let msg = ''
      switch (type) {
        case 'homeScore':
          currentMatch.homeScore++;
          msg = <span>
            <b class="text-danger">
              {currentMatchHome} {currentMatch.homeScore}
            </b>
            : {currentMatch.guestScore}{currentMatchGuest}
          </span>
          message.success(msg, 5)
          break;
        case 'homeRed':
          currentMatch.homeRed++;
          break;
        case 'homeYellow':
          currentMatch.homeYellow++;
          break;
        case 'guestScore':
          currentMatch.guestScore++;
          msg = <span>
            {currentMatchHome} {currentMatch.homeScore} :
                <b class="text-danger">
              {currentMatch.guestScore}{currentMatchGuest}
            </b>
          </span>
          message.success(msg, 5)
          break;
        case 'guestRed':
          currentMatch.guestRed++;
          break;
        case 'guestYellow':
          currentMatch.guestYellow++;
          break;
        default:
          break;
      }




      this.setState({
        data: this.state.data
      })

    }
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
        align: 'center',
        render: (value, record) => <span title={record.matchYear + "-" + record.matchDate + " " + record.matchTime}> {record.matchDate + " " + record.matchTime}</span>,
      },
      {
        title: '主隊',
        dataIndex: 'home',
        align: 'center',
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
        align: 'center',
        render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
      },
      {
        title: '客隊',
        dataIndex: 'guest',
        align: 'center',
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
        align: 'center',
        render: (value, record) => <span>{record.homeHalfScore} - {record.guestHalfScore}</span>,

      },
      {
        title: 'local模擬',
        dataIndex: 'mock',
        align: 'right',
        render: (value, record) =>
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="0">
                <a onClick={e => this.handleOpeation('homeScore', record.matchId)}>主隊進球 +1</a>
              </Menu.Item>
              <Menu.Item key="0">
                <a onClick={e => this.handleOpeation('homeRed', record.matchId)}>主隊紅牌 +1</a>
              </Menu.Item>
              <Menu.Item key="0">
                <a onClick={e => this.handleOpeation('homeYellow', record.matchId)}>主隊黃牌 +1</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="1">
                <a onClick={e => this.handleOpeation('guestScore', record.matchId)}>客隊進球 +1</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a onClick={e => this.handleOpeation('guestRed', record.matchId)}>客隊紅牌 +1</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a onClick={e => this.handleOpeation('guestYellow', record.matchId)}>客隊黃牌 +1</a>
              </Menu.Item>
            </Menu>
          } trigger={['click']}>
            <a className="ant-dropdown-link">
              模擬 <Icon type="down" />
            </a>
          </Dropdown>,

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