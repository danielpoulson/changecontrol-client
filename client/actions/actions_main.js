import axios from 'axios';
import config from '../../configEnv';

export const SET_CHANGE_STATE = 'SET_CHANGE_STATE';
export const SET_MAIN = 'SET_MAIN';
export const SET_USER = 'SET_USER';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const SET_FILETAB_COUNT = 'SET_FILETAB_COUNT';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER_DASHBOARD = 'SET_USER_DASHBOARD';
export const SET_USER_FROM_SESSION_STATE = 'SET_USER_FROM_SESSION_STATE';

export function addUserDashboard(dashboard: any) {
  return { type: SET_USER_DASHBOARD, payload: dashboard };
}

export function getUserDashboard(username) {
  return (dispatch: Function) => {
    axios
      .get(`${config.serverURL}/api/changes/userdashboard/${username}`)
      .then(response => {
        dispatch(addUserDashboard(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function setChangeState() {
  return { type: SET_CHANGE_STATE };
}

export function setMain(data) {
  return { type: SET_MAIN, data };
}

export function setFiletabCount(data) {
  return { type: SET_FILETAB_COUNT, data };
}

export function setLoading(data) {
  return { type: SET_LOADING, data };
}

export function setTitle(data) {
  return { type: 'SET_TITLE', data };
}

export function setUserFromSessionState() {
  return { type: SET_USER_FROM_SESSION_STATE };
}

export function setReturnedUser(request: Object) {
  return { type: SET_USER, payload: request };
}

export function setUser() {
  return (dispatch: Function) => {
    axios
      .get(`${config.serverURL}/api/users/logged`)
      .then(response => {
        dispatch(setReturnedUser(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function addLogin(user: any) {
  return { type: SET_USER, payload: user };
}

export function login(username) {
  const url = `${config.serverURL}/login`;
  return (dispatch: Function) => {
    axios
      .post(url, username)
      .then(response => {
        dispatch(addLogin(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function resetUser() {
  return { type: USER_LOGGED_OUT };
}

export function logoutUser() {
  return (dispatch: Function) => {
    axios
      .get(`${config.serverURL}/logout`)
      .then(() => {
        dispatch(resetUser());
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}
