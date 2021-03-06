import axios from 'axios';
import config from '../../configEnv';

export const GET_CHANGES = 'GET_CHANGES';
export const GET_CHANGE = 'GET_CHANGE';
export const ADD_CHANGE = 'ADD_CHANGE';
export const EDIT_CHANGE = 'EDIT_CHANGE';
export const LOAD_PAGE_CHANGES = 'LOAD_PAGE_CHANGES';
export const CREATE_LOG = 'CREATE_LOG';
export const BOOKOUT_FILE = 'BOOKOUT_FILE';

export function getChanges(data) {
  const url = `${config.serverURL}/api/changes/all/${data}`;
  const request = axios.get(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: GET_CHANGES,
    payload: request
  };
}

export function getChange(data) {
  const url = `${config.serverURL}/api/changes/${data}`;
  let request = {};

  if (data !== 'new') {
    request = axios.get(url).catch(error => {
      console.error('axios error', error); // eslint-disable-line no-console
    });
  }

  return {
    type: GET_CHANGE,
    payload: request
  };
}

export function addChange(data) {
  const url = `${config.serverURL}/api/changes`;
  const request = axios.post(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: ADD_CHANGE,
    payload: request
  };
}

export function editChange(data) {
  const url = `${config.serverURL}/api/changes/${data._id}`;
  axios.put(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: EDIT_CHANGE,
    payload: data
  };
}

// TODO: Delete change from cached list of changes

export function closeChange(data) {
  const url = `${config.serverURL}/api/changes/${data._id}`;
  axios.put(url, data).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: 'DELETE_CHANGE',
    payload: data._id
  };
}

export function loadPage(data) {
  return {
    type: LOAD_PAGE_CHANGES,
    data
  };
}

export function addLogComment(data) {
  return {
    type: CREATE_LOG,
    payload: data
  };
}

export function createLog(data) {
  const url = `${config.serverURL}/api/changes/changelog/${data.CC_No}`;
  return (dispatch: Function) => {
    axios.put(url, data).then(() => dispatch(addLogComment(data))).catch(error => console.error('axios error', error)); // eslint-disable-line no-console
  };
}

export function bookoutFile(data) {
  const url = `${config.serverURL}/api/filebooked/${data._id}`;
  axios.put(url).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: BOOKOUT_FILE,
    payload: data
  };
}

export function exportChanges(search: string) {
  const url = `${config.serverURL}/api/changes/export`;
  const request = axios.post(url, search).catch(error => {
    console.error('axios error', error); // eslint-disable-line no-console
  });

  return {
    type: 'ADD_EXPORTFILE',
    payload: request
  };
}

export function setChanges() {
  return {
    type: 'SET_CHANGES'
  };
}

export function setSearch(search: string) {
  return {
    type: 'SET_SEARCH',
    search
  };
}
