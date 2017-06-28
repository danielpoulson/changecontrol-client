// data-function ver-001 10/06/2017 DP
import sortBy from 'lodash/fp/sortBy';
import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';

const perPage = 15;
const initPage = 1;

export function pagedList(data, page) {
  const _page = page || initPage;
  const offset = (_page - 1) * perPage;
  return data.slice(offset, offset + perPage);
}

export function searchData(data, searchText, sortColumn, columns) {
  const reg1 = new RegExp(`${searchText}.*`, 'i');

  function search(item) {
    if (item[columns[0]].match(reg1) || item[columns[1]].match(reg1) || item[columns[2]].match(reg1)) {
      return true;
    }
    return false;
  }

  let _sortColumn = sortColumn;

  if (typeof sortColumn === 'undefined') {
    _sortColumn = columns[0];
  }

  if (searchText === null) {
    return sortBy(_sortColumn, data);
  }

  const newList = compose(sortBy(_sortColumn), filter(search))(data);

  return newList;
}

export function removeByIndex(data, index) {
  return data.filter(item => item._id !== index);
}

export function getBySourceId(data, id) {
  return data.filter(item => item.SourceId === id);
}
