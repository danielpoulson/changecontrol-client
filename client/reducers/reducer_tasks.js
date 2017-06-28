import { findIndex } from 'lodash';
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  GET_TASKS,
  LOAD_PAGE_TASKS,
  GET_PROJECT_TASKS,
  SET_CAPA
} from '../actions/actions_tasks';
import { pagedList, removeByIndex, searchData, getBySourceId } from '../utils/data-functions';

const initialState = {
  alldata: [],
  paged: [],
  ctTotal: 0,
  //List of the current tasks for selected change
  ctlist: [],
  perPage: 15,
  page: 1,
  columns: ['SourceId', 'TKChamp', 'TKName']
};

//TODO: (3) MED ctlist should (or should ... good idea?) be filtered from the 'alldata' list
//Like pagedList is

export default function(state = initialState, action) {
  let alldata = [];
  let _data = {};
  let perPage = 15;
  let page = 1;
  let paged = [];
  let searchText = '';
  let ctTotal = 0;
  let ctlist = [];

  switch (action.type) {
    //What does this do what is the point
    //   case ADD_DEV:
    // alldata = [ ...state.alldata, _data ];
    // ctlist = [];
    // ctTotal = 0;
    // return {
    //   ...state,
    //   alldata,
    //   ctlist,
    //   ctTotal
    // };
    case ADD_TASK:
      _data = action.payload.data;
      alldata = [...state.alldata, _data];
      ctlist = [...state.ctlist, _data];
      ctTotal = ctlist.length;

      return {
        ...state,
        alldata,
        ctlist,
        ctTotal
      };

    case EDIT_TASK: {
      _data = action.payload;
      // findIndex is not availible in IE11
      // const index = state.alldata.findIndex(item => item._id === _data._id);

      const index = findIndex(state.alldata, { _id: _data._id });

      alldata = [
        ...state.alldata.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.alldata.slice(index + 1)
      ];

      ctlist = getBySourceId(alldata, _data.SourceId);
      paged = pagedList(alldata);

      return {
        ...state,
        alldata,
        ctlist,
        paged
      };
    }

    case DELETE_TASK: {
      const _id = action.payload;
      alldata = removeByIndex(state.alldata, _id);
      ctlist = removeByIndex(state.ctlist, _id);
      ctTotal = ctlist.length;
      return {
        ...state,
        alldata,
        ctlist,
        ctTotal
      };
    }

    case GET_PROJECT_TASKS:
      ctlist = action.payload.data;
      ctTotal = ctlist.length;

      return {
        ...state,
        ctlist,
        ctTotal
      };

    case GET_TASKS:
      //Loads on start up and get all the active tasks.
      //Loads one page of active task from alldata
      // this.props.loadPage(page_num, this.state.numPage, search);
      alldata = action.payload.data;
      paged = pagedList(alldata);

      return {
        ...state,
        page,
        perPage,
        total: alldata.length,
        total_pages: Math.ceil(alldata.length / perPage),
        paged,
        alldata
      };

    case LOAD_PAGE_TASKS: {
      const column = action.data.column || state.sorted;
      perPage = action.data.numPage || 15;
      page = action.data.page_num || 1;
      searchText = action.data.search;
      const searcheddata = searchData(state.alldata, searchText, column, initialState.columns);
      paged = pagedList(searcheddata, page);

      return {
        ...state,
        sorted: column,
        searchText,
        page,
        perPage,
        total: searcheddata.length,
        total_pages: Math.ceil(alldata.length / perPage),
        paged
      };
    }

    case SET_CAPA: {
      const showCapaOnly = !state.showCapaOnly;

      return {
        ...state,
        showCapaOnly
      };
    }

    default:
      return state;
  }
}
