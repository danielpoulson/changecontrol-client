import moxios from 'moxios';
import { serverURL } from '../../utils/helpers';
import { addLogin, login, resetUser, setReturnedUser, setUserFromSessionState } from '../actions_main';

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
          expect(request.url).toEqual(`${serverURL}/login`);
          expect(dispatchMock).toBeCalledWith(addLogin(_user));
          done();
        });
    });
  });
});
