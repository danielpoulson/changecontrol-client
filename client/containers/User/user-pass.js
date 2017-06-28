import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { userPassIsValid } from './user-form.validation';

import { savePass } from '../../actions/actions_users';

class UserPass extends Component {
  state = {
    passwords: {
      password: '',
      password2: ''
    },
    errors: []
  };

  onChange = e => {
    const passwords = this.state.passwords;
    const _name = e.target.name;
    passwords[_name] = e.target.value;

    this.setState({ passwords });
  };

  onSave = e => {
    e.preventDefault();
    const passwords = this.state.passwords;

    if (passwords.password === passwords.password2) {
      const validation = userPassIsValid(passwords.password);
      this.setState({ errors: validation.errors });

      if (!validation.formIsValid) {
        return;
      }

      toastr.success('Yeah Baby... You password has been changed', 'User Account', { timeOut: 1000 });
      this.props.savePass(this.props.id, passwords.password);
    } else {
      toastr.error('Nooooooo... These passwords did not match ... please try again.', 'User Account', {
        timeOut: 2000
      });
    }
  };
  props: {
    id: string,
    savePass: {
      id: string
    }
  };

  render() {
    let wrapperClass = 'form-group';
    let alertClass = 'col-sm-9 col-md-offset-3';

    if (this.state.errors.length > 0) {
      wrapperClass += ' has-error';
      alertClass += ' alert alert-danger';
    }

    return (
      <div className="col-sm-12">
        <h2>Change password</h2>
        <form className="form form-horizontal">

          <ul className={alertClass}>{this.state.errors}</ul>

          <div className={wrapperClass}>
            <label htmlFor="password" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-3">
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
          </div>

          <div className={wrapperClass}>
            <label htmlFor="password2" className="col-sm-3 control-label">Re-enter Password</label>
            <div className="col-sm-3">
              <input
                type="password"
                name="password2"
                className="form-control"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
          </div>

          <div className="col-sm-9 col-md-offset-3">
            <Link to="/home">
              <button type="submit" className="btn btn-success pull-left" onClick={this.onSave}>Save</button>
            </Link>
            <Link to="/home">
              <button className="btn btn-info dp-margin-10-LR">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.main.user.id
  };
}

export default connect(mapStateToProps, { savePass })(UserPass);
