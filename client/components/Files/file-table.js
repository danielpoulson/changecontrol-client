import React from 'react';
import FileRow from './file-row';

type Props = {
  user: {},
  exportFiles: string,
  files: mixed[],
  createLog: any,
  deleteFile: any,
  removeFile: any,
  bookoutFile: any
};

const FileTable = ({ user, exportFiles, files, createLog, deleteFile, removeFile, bookoutFile }: Props) => {
  let fileRows;

  if (Object.keys(files).length > 0) {
    fileRows = files.map(file => (
      <FileRow
        key={file._id}
        file={file}
        user={user}
        exportFiles={exportFiles}
        createLog={createLog}
        deleteFile={deleteFile}
        removeFile={removeFile}
        bookoutFile={bookoutFile}
      />
    ));
  }

  return (
    <div className="panel panel-success">
      <table className="table table-hover project-table dp_point">
        <thead>
          <tr className="print-table-head">
            <th>Type</th>
            <th>File Name</th>
            <th>User</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="panel-body">{fileRows}</tbody>
      </table>
    </div>
  );
};

export default FileTable;
