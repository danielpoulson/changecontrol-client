import moxios from 'moxios';
import { baseURL } from '../../utils/helpers';
import { addLogin, login, resetUser, setReturnedUser, setUserFromSessionState } from '../actions_main';
import { getUsers, setUsers } from '../actions_users';

const _user = {
  success: true,
  user: {
    id: '588d97a89be9b78bb608692b',
    fullname: 'Daniel Poulson',
    email: 'danielpoulson@icloud.com',
    username: 'danielp',
    role: 'admin'
  }
};

const users = [
  'Daniel Poulson',
  'George Saville',
  'Keith Quiney',
  'Matthew Johnston',
  'Paige Finnegan',
  'Patrick Madden'
];

test('setUserFromSessionState', () => {
  expect(setUserFromSessionState()).toMatchSnapshot();
});

test('resetUser ', () => {
  expect(resetUser()).toMatchSnapshot();
});

test('setReturnedUser', () => {
  expect(setReturnedUser(_user)).toMatchSnapshot();
});

test('addLogin', () => {
  expect(addLogin(_user)).toMatchSnapshot();
});

test('login', (done: Function) => {
  const dispatchMock = jest.fn();
  const username = { username: 'danielp', password: 'danielp' };
  moxios.withMock(() => {
    login(username)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: _user
        })
        .then(() => {
          expect(request.url).toEqual(`${baseURL}/login`);
          expect(dispatchMock).toBeCalledWith(addLogin(_user));
          done();
        });
    });
  });
});

test('addLogin', () => {
  expect(setUsers(users)).toMatchSnapshot();
});

test('getUsers', (done: Function) => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    getUsers()(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: users
        })
        .then(() => {
          expect(request.url).toEqual(`${baseURL}/api/users/all`);
          expect(dispatchMock).toBeCalledWith(setUsers(users));
          done();
        });
    });
  });
});
