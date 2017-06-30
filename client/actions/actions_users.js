//SYNC 11/03/2017 DP
import axios from 'axios';
import { baseURL } from '../utils/helpers';

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
      .get(`${baseURL}/api/users/all`)
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
      .get(`${baseURL}/api/users/${id}`)
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

export function createUser(data) {
  const url = `${baseURL}/api/users`;
  axios.post(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: USER_CREATED,
    fullname: data.fullname
  };
}

export function saveUser(data) {
  const url = `${baseURL}/api/users/updateuser/${data.username}`;
  axios.put(url, data);

  return {
    type: SAVE_USER,
    data
  };
}

export function savePass(id, password) {
  const url = `${baseURL}/api/users/updatepass/${id}`;
  axios.put(url, { password });

  return {
    type: 'PASSWORD_CHANGED'
  };
}

export function deleteUser(data) {
  const fullname = data;
  const url = `${baseURL}/api/users/${data}`;
  axios.delete(url);
  // TODO: (3) LOW Remove server call to repopulate user after delete
  // This action should remove the user from the state tree
  // See user-profile ondeleteUser
  return {
    type: DELETED_USER,
    fullname
  };
}
