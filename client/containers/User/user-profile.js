import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import UserProfileForm from '../../components/User/user-profile-form';
import UserSelect from '../../components/User/user-select';
import { usersFormattedForDropdown } from '../../selectors/selectors';
import { userFormIsValid } from './user-form.validation';

import { getUser, getUsers, createUser, resetUser, saveUser, deleteUser } from '../../actions/actions_users';

class UserProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isNewUser: false,
      user: Object.assign({}, props.user),
      errors: {}
    };

    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user._id !== nextProps.user._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.setState({ isNewUser: false });
    this.props.history.push('/');
  }

  onChange(event) {
    this.props.getUser(event.target.value);
  }

  newUser() {
    this.setState({ isNewUser: true });
    this.props.resetUser();
  }

  deleteUser(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.user._id, this.props.user.fullname);
    toastr.warning('User account has been deleted', 'User Account', { timeOut: 1000 });
    this.setState({ user: {} });
  }

  saveUser(event) {
    event.preventDefault();
    const _user = this.state.user;

    const validation = userFormIsValid(_user);
    this.setState({ errors: validation.errors });

    if (!validation.formIsValid) {
      return;
    }

    if (this.state.isNewUser) {
      this.props.createUser(_user);
      this.setState({ isNewUser: false });
      toastr.success('New user account has been created', 'User Account', { timeOut: 1000 });
    } else {
      this.props.saveUser(_user);
      toastr.success('User account has been saved', 'User Account', { timeOut: 1000 });
    }
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  props: {
    user: any,
    users: any,
    resetUser: any,
    getUser: any,
    createUser: any,
    saveUser: any,
    deleteUser: any,
    history: {
      push: Function
    }
  };
  render() {
    const formStyle = {
      backgroundColor: '#fcfffc',
      border: 'solid 1px',
      height: 370,
      borderRadius: 4,
      marginRight: 0,
      marginLeft: 0,
      padding: 15
    };

    const roleSelect = [{ value: 'user', text: 'user' }, { value: 'admin', text: 'admin' }];

    return (
      <div>
        <div>
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">User Profiles </p>
            </div>
          </div>
        </div>

        <div className="row" style={formStyle}>

          {this.state.isNewUser
            ? null
            : <UserSelect users={this.props.users} onChange={this.onChange} newUser={this.newUser} />}

          <UserProfileForm
            errors={this.state.errors}
            user={this.state.user}
            newUser={this.state.isNewUser}
            onSave={this.saveUser}
            deleteUser={this.deleteUser}
            onCancel={this.onCancel}
            onChange={this.updateUserState}
            roleSelect={roleSelect}
          />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    users: usersFormattedForDropdown(state.users)
  };
}

export default connect(mapStateToProps, { getUser, createUser, resetUser, saveUser, deleteUser, getUsers })(
  UserProfile
);
