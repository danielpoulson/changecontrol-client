//SYNC 11/03/2017 DP
import React from 'react';
import FileList from '../../containers/Files/file-list';
import SectionHeader from '../Common/section-header';

const FileExport = () =>
  <div>
    <SectionHeader colSize="6" headerSize="main" title="Exported File List" hideSearch="hidden" />
    <FileList exportFiles="hidden" />
  </div>;

export default FileExport;
