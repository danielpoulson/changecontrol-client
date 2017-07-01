//SYNC VER.002 DP
import axios from 'axios';
import { serverURL } from '../utils/helpers';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOAD_PAGE_TASKS = 'LOAD_PAGE_TASKS';
export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS';
export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const SET_CAPA = 'SET_CAPA';

export function getTasks(data) {
  const url = `${serverURL}/api/tasks/${data}`;
  const request = axios.get(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: GET_TASKS,
    payload: request
  };
}

export function getAllTasks() {
  const _status = 4;
  const _capa = 0;
  const url = `${serverURL}/api/tasks/all/${_status}/${_capa}`;
  const request = axios.get(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: GET_TASKS,
    payload: request
  };
}

export function getProjectTasks(data) {
  const url = `${serverURL}/api/tasks/project/${data}`;
  const request = axios.get(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: GET_PROJECT_TASKS,
    payload: request
  };
}

export function getTask(data) {
  let request = {};

  if (data !== 'new') {
    const url = `${serverURL}/api/tasks/${data}`;
    request = axios.get(url).catch(error => {
      console.error('axios error', error); // eslint-disable-line no-console
    });
  }

  return {
    type: GET_TASK,
    payload: request
  };
}

export function addTask(data) {
  const url = `${serverURL}/api/tasks`;
  const request = axios.post(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: ADD_TASK,
    payload: request
  };
}

export function editTask(data) {
  const url = `${serverURL}/api/tasks/${data._id}`;
  axios.put(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: EDIT_TASK,
    payload: data
  };
}

export function deleteTask(data) {
  const url = `${serverURL}/api/tasks/${data}`;
  axios.delete(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: DELETE_TASK,
    payload: data
  };
}

export function loadPageTask(data) {
  return {
    type: LOAD_PAGE_TASKS,
    data
  };
}

export function exportTasks(search) {
  const url = `${serverURL}/api/tasks/export`;
  const request = axios.post(url, search).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: 'ADD_EXPORTFILE',
    payload: request
  };
}

export function setCapa() {
  return {
    type: SET_CAPA
  };
}
