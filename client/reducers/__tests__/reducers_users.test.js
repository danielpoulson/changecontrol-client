import reducer from '../reducer_users';
import { addNewUser, removeUser, setUsers } from '../../actions/actions_users';

const UserList = ['Daniel Ricciardo', 'Sebastian Vettel', 'Lewis Hamilton', 'Valtteri Bottas'];

test('USER_CREATED should add a new user to the userlist', () => {
  const initialState = UserList;
  const newUser = ['Michael Schumacher'];
  const action = addNewUser(newUser);
  const newState = reducer(initialState, action);
  expect(newState).toMatchSnapshot();
});

test('GET_USERS should return a list of current users', () => {
  const initialState = [];

  const action = setUsers(UserList);
  const newState = reducer(initialState, action);
  expect(newState).toMatchSnapshot();
});

test('DELETE_USER should remove an item from the current users', () => {
  const initialState = [];
  const newUser = ['Lewis Hamilton'];
  const action = removeUser(newUser);
  const newState = reducer(initialState, action);
  expect(newState).toMatchSnapshot();
});
