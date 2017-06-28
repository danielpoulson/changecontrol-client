import React from 'react';

type Props = {
  login: Object,
  onChange: any,
  onLogin: any
};

const Login = ({ login, onChange, onLogin }: Props) => (
  <div className="navbar-right">
    <form className="navbar-form">
      <div className="form-group">
        <input
          placeholder="Username"
          value={login.username || ''}
          onChange={onChange}
          type="text"
          name="username"
          className="form-control"
        />
      </div>
      <div className="form-group dp-margin-5-LR ">
        <input
          placeholder="Password"
          value={login.password || ''}
          onChange={onChange}
          type="password"
          name="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-success" onClick={onLogin}><i className="fa fa-sign-in" />{' '}Log In</button>
    </form>
  </div>
);

export default Login;
