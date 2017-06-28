// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserDashboard } from '../../actions/actions_main';
import { loadPage, setSearch } from '../../actions/actions_changes';
import { loadPageTask } from '../../actions/actions_tasks';
import RechartBarChart from '../../components/graphs/rechart-bar-chart';
import RechartLineChart from '../../components/graphs/rechart-line-chart';

import './styles.css';

class Home extends Component {
  componentWillMount() {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.props.getUserDashboard(username);
    }
  }

  getTasks = () => {
    const action = {};
    action.search = this.props.fullname || null;
    this.props.loadPageTask(action);
  };

  getChanges = () => {
    this.props.setSearch(this.props.fullname);
    this.props.history.push('/changes');
  };

  getAllTasks = () => {
    const action = {};
    action.search = null;
    this.props.loadPageTask(action);
  };

  getAllChanges = () => {
    const action = {};
    action.search = null;
    this.props.loadPage(action);
  };
  props: {
    allOpenChanges: number,
    allOpenTasks: number,
    countChangesUser: number,
    countTasksUser: number,
    fullname: string,
    getUserDashboard: any,
    loadPage: any,
    loadPageTask: any,
    history: any,
    setSearch: any
  };

  render() {
    return (
      <div>
        <div className="dashboard"><h1>Dashboard</h1></div>
        <div className="row">
          <div className="col-sm-3">
            <div className="tile green grow" onClick={this.getChanges}>
              <h2>My Changes</h2>
              <i className="fa fa-list-alt" />&nbsp; {this.props.countChangesUser}
            </div>
          </div>
          <Link to="/tasks">
            <div className="col-sm-3">
              <div className="tile blue grow" onClick={this.getTasks}>
                <h2>My Tasks</h2>
                <i className="glyphicon glyphicon-list-alt">&nbsp; </i>{this.props.countTasksUser}
              </div>
            </div>
          </Link>
          <Link to="/changes">
            <div className="col-sm-3">
              <div className="tile orange grow" onClick={this.getAllChanges}>
                <h2>Open Changes</h2>
                <i className="fa fa-list-alt" />&nbsp; {this.props.allOpenChanges}
              </div>
            </div>
          </Link>
          <Link to="/tasks">
            <div className="col-sm-3">
              <div className="tile purple grow" onClick={this.getAllTasks}>
                <h2>Open Tasks</h2>
                <i className="fa fa-tasks" />&nbsp; {this.props.allOpenTasks}
              </div>
            </div>
          </Link>
        </div>
        <div className="row cc-graph">
          <div className="col-sm-6">
            <h3>Open vs Closed Change Controls</h3>
            <RechartBarChart />
          </div>
          <div className="col-sm-6">
            <h3>Overdue Tasks</h3>
            <RechartLineChart />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    fullname: state.main.user.fullname,
    countChangesUser: state.main.countChangesUser,
    allOpenChanges: state.main.allOpenChanges,
    allOpenTasks: state.main.allOpenTasks,
    countTasksUser: state.main.countTasksUser
  }),
  { getUserDashboard, loadPage, loadPageTask, setSearch }
)(Home);
