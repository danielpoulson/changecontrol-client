import moxios from 'moxios';
import { serverURL } from '../../utils/helpers';
import { addUser, addNewUser, getUser, getUsers, setUsers } from '../actions_users';

const users = [
  'Daniel Poulson',
  'George Saville',
  'Keith Quiney',
  'Matthew Johnston',
  'Paige Finnegan',
  'Patrick Madden'
];

const userData = {
  success: true,
  user: {
    id: '588d97a89be9b78bb608692b',
    fullname: 'Daniel Poulson',
    email: 'danielpoulson@icloud.com',
    username: 'danielp',
    role: 'admin'
  }
};

test('setUsers', () => {
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
          expect(request.url).toEqual(`${serverURL}/api/users/all`);
          expect(dispatchMock).toBeCalledWith(setUsers(users));
          done();
        });
    });
  });
});

test('addUser', () => {
  expect(addUser(userData.user)).toMatchSnapshot();
});

test('getUser', (done: Function) => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    getUser(userData.user.id)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: userData.user
        })
        .then(() => {
          expect(request.url).toEqual(`${serverURL}/api/users/${userData.user.id}`);
          expect(dispatchMock).toBeCalledWith(addUser(userData.user));
          done();
        });
    });
  });
});

xtest('addNewUser', () => {
  expect(addNewUser(user)).toMatchSnapshot();
});
