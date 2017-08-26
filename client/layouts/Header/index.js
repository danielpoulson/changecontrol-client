import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../components/Login/login';
import NavBar from '../../layouts/Navigation/nav-bar';
import config from '../../../configEnv';
import './header.css';

import { getUserDashboard, login } from '../../actions/actions_main';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {}
    };
    this.onLogin = this.onLogin.bind(this);
    this.setStateLogin = this.setStateLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.props.login(this.state.login);
    this.props.getUserDashboard(this.state.login.username);
  }

  setStateLogin(evt) {
    const _login = this.state.login;
    const name = evt.target.name;
    const value = evt.target.value;
    _login[name] = value;
    return this.setState({ login: _login });
  }

  props: {
    getUserDashboard: any,
    login: any,
    fullname: string
  };

  render() {
    return (
      <div>
        <div className={`top-band top-band-${config.theme}`}>
          <section className="col-sm-12">
            <div className="col-sm-5">
              <h3 className="top-band-h3">NPI - Change Control</h3>
            </div>
            <div className="col-sm-7 login-div">
              {!this.props.fullname
                ? <Login login={this.state.login} onChange={this.setStateLogin} onLogin={this.onLogin} />
                : <p className="pull-right">Welcome: {this.props.fullname}</p>}
            </div>
            <Link to="/user_pass" className="pull-right change-link">
              {this.props.fullname ? 'Change Password?' : ''}
            </Link>
          </section>

        </div>
        <NavBar />
      </div>
    );
  }
}

export default connect(state => ({ fullname: state.main.user.fullname }), { getUserDashboard, login })(Header);
