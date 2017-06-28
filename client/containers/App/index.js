import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllTasks } from '../../actions/actions_tasks';
import { setUser } from '../../actions/actions_main';
import { getUsers } from '../../actions/actions_users';
import { getChanges } from '../../actions/actions_changes';

import '../../styles/font-awesome/css/font-awesome.min.css';
import './styles/app.css';

/* application components */
import Header from '../../layouts/Header';

class App extends Component {
  componentWillMount() {
    const authorised: any = sessionStorage.getItem('authorised');
    this.props.getAllTasks();
    this.props.getChanges(4);
    this.props.getUsers();
    if (authorised === 'true') {
      this.props.setUser();
    }
  }

  props: {
    getAllTasks: any,
    getChanges: any,
    getUsers: any,
    setUser: any
  };

  render() {
    return <Header />;
  }
}

export default connect(null, { getAllTasks, setUser, getUsers, getChanges })(App);
