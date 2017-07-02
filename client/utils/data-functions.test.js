import { removeByName } from '../utils/data-functions';

const UserList = ['Daniel Ricciardo', 'Sebastian Vettel', 'Lewis Hamilton', 'Valtteri Bottas'];

test('When passed a name the name will be removed from the index', () => {
  const NewUserList = ['Daniel Ricciardo', 'Sebastian Vettel', 'Valtteri Bottas'];
  const newArray = removeByName(UserList, 'Lewis Hamilton');
  expect(NewUserList).toEqual(newArray);
});
