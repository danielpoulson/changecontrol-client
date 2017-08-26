import React from 'react';
import SearchBox from './search-box';
import config from '../../../configEnv';
import './section-header.css';

type Props = {
  colSize: string,
  headerSize: stirng,
  hideSearch: string,
  onSearchText: any,
  searchText: string,
  title: string
};

const SectionHeader = ({ colSize, headerSize, hideSearch, onSearchText, searchText, title }: Props) =>
  <div>
    <div className={`section-header-main section-header-${config.theme}`}>
      <div className={`col-sm-${colSize} pull-left`}>
        <p className={`section-header-text-${headerSize}`}>{title}</p>
      </div>
      <SearchBox hideSearch={hideSearch} searchText={searchText} onChange={onSearchText} />
    </div>
  </div>;

export default SectionHeader;
