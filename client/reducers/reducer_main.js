/* eslint "indent": "off" */
import toastr from 'toastr';
import {
  SET_MAIN,
  SET_CHANGE_STATE,
  SET_USER,
  USER_LOGGED_OUT,
  SET_FILETAB_COUNT,
  SET_LOADING,
  SET_USER_DASHBOARD,
  SET_USER_FROM_SESSION_STATE
} from '../actions/actions_main';

const initialState = {
  MainId: '',
  ChangeTitle: '',
  CurrentMode: 'change',
  showAll: false,
  user: {
    username: '',
    fullname: '',
    role: 'user'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        MainId: action.data.MainId,
        CurrentMode: action.data.CurrentMode,
        loading: action.data.loading
      };

    case SET_CHANGE_STATE:
      return {
        ...state,
        showAll: !state.showAll
      };

    case SET_USER: {
      let user = {};

      if (action.payload.success) {
        user = action.payload.user;

        user.authState = true;
        sessionStorage.setItem('authorised', true);
        sessionStorage.setItem('role', user.role);
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('fullname', user.fullname);
        sessionStorage.setItem('id', user.id);
      } else {
        toastr.error('Your username / password combination was incorrect!', 'Authentication Failed', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right'
        });
      }

      return {
        ...state,
        user
      };
    }

    case SET_USER_FROM_SESSION_STATE: {
      const user = {};

      user.authState = sessionStorage.getItem('authorised');
      user.username = sessionStorage.getItem('username');
      user.fullname = sessionStorage.getItem('fullname');
      user.role = sessionStorage.getItem('role');
      user.id = sessionStorage.getItem('id');

      return {
        ...state,
        user
      };
    }

    case USER_LOGGED_OUT:
      sessionStorage.clear();
      return {
        ...state,
        user: initialState.user
      };

    case SET_FILETAB_COUNT:
      return {
        ...state,
        fileTabCount: action.data
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.data.loading
      };

    case 'SET_TITLE':
      return {
        ...state,
        ChangeTitle: action.data
      };

    case SET_USER_DASHBOARD: {
      const countChangesUser = action.payload ? action.payload.changeCount : 0;
      const countTasksUser = action.payload ? action.payload.taskCount : 0;
      const allOpenTasks = action.payload ? action.payload.allTaskCount : 0;
      const allOpenChanges = action.payload ? action.payload.allChangeCount : 0;
      const barData = action.payload ? action.payload.barData : {};
      const lineData = action.payload ? action.payload.lineData : {};
      return {
        ...state,
        barData,
        lineData,
        countChangesUser,
        countTasksUser,
        allOpenTasks,
        allOpenChanges
      };
    }

    default:
      return state;
  }
}
