//SYNC 11/03/2017 DP
import axios from 'axios';
import config from '../../configEnv';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const RESET_USER = 'RESET_USER';
export const SAVE_USER = 'SAVE_USER';
export const DELETED_USER = 'DELETED_USER';
export const USER_CREATED = 'USER_CREATED';

export function setUsers(users) {
  return { type: GET_USERS, payload: users };
}

export function getUsers() {
  return (dispatch: Function) => {
    axios
      .get(`${config.serverURL}/api/users/all`)
      .then(response => {
        dispatch(setUsers(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function addUser(user) {
  return { type: GET_USER, payload: user };
}

export function getUser(id) {
  return (dispatch: Function) => {
    axios
      .get(`${config.serverURL}/api/users/${id}`)
      .then(response => {
        dispatch(addUser(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function resetUser() {
  return {
    type: RESET_USER
  };
}

export function addNewUser(fullname) {
  return {
    type: USER_CREATED,
    fullname
  };
}

export function createUser(data) {
  return (dispatch: Function) => {
    axios
      .post(`${config.serverURL}/api/users`, data)
      .then(() => {
        dispatch(addNewUser(data.fullname));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}

export function saveUser(data) {
  const url = `${config.serverURL}/api/users/updateuser/${data.username}`;
  axios.put(url, data);

  return {
    type: SAVE_USER,
    data
  };
}

export function savePass(id, password) {
  const url = `${config.serverURL}/api/users/updatepass/${id}`;
  axios.put(url, { password });

  return {
    type: 'PASSWORD_CHANGED'
  };
}

export function removeUser(fullname) {
  return {
    type: DELETED_USER,
    fullname
  };
}

export function deleteUser(id, fullname) {
  return (dispatch: Function) => {
    axios
      .delete(`${config.serverURL}/api/users/${id}`)
      .then(() => {
        dispatch(removeUser(fullname));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}
