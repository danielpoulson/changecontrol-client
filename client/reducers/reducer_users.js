import { GET_USERS, USER_CREATED, DELETED_USER } from '../actions/actions_users';
import { removeByName } from '../utils/data-functions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    case USER_CREATED:
      return [...state, ...action.fullname];

    case DELETED_USER:
      return removeByName(state, action.fullname);

    default:
      return state;
  }
}
