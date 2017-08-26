import React from 'react';
import config from '../../../configEnv';
import './search-box.css';

type Props = {
  hideSearch: string,
  searchText: string,
  onChange: any
};

const SearchBox = ({ hideSearch, searchText, onChange }: Props) =>
  <div className={hideSearch}>
    <div className="col-sm-6 pull-right input-group search-box-main">
      <input
        type="text"
        className="form-control"
        value={searchText || ''}
        onChange={onChange}
        placeholder="Enter Search Text"
      />
      <span className={`input-group-addon glyphicon glyphicon-search search-icon search-icon-${config.theme}`} />
    </div>
  </div>;

export default SearchBox;
