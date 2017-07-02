import reducer from '../reducer_user';
import { addUser } from '../../actions/actions_users';

test('addUser should add selected user to state', () => {
  const initialState = {};
  const user = {
    id: '588d97a89be9b78bb608692b',
    fullname: 'Daniel Poulson',
    email: 'danielpoulson@icloud.com',
    username: 'danielp',
    role: 'admin'
  };

  const action = addUser(user);
  const newState = reducer(initialState, action);
  expect(newState).toMatchSnapshot();
});
