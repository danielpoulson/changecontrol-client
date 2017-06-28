//SYNC 11/03/2017 DP
import React from 'react';
import moment from 'moment';
import { getExt } from '../../utils/status';
import DownloadButton from '../../components/Common/download-button';
import BookoutButton from '../../components/Common/bookout-button';

type Props = {
  file: {},
  removeFile: any,
  exportFiles: string,
  user: {},
  createLog: any,
  deleteFile: any,
  bookoutFile: any
};

const FileRow = ({ file, removeFile, exportFiles, user, createLog, deleteFile, bookoutFile }: Props) => {
  const fullFileName = `${file.fsSource} - ${file.fsFileName}.${file.fsFileExt}`;

  return (
    <tr>
      <td><i className={getExt(file.fsFileExt)} /></td>
      <td>{file.fsFileName}</td>
      <td>{file.fsAddedBy}</td>
      <td>{moment(new Date(file.fsAddedAt)).format('DD/MM/YYYY')}</td>
      <td>
        <DownloadButton removeFile={removeFile} fileLoad={fullFileName} fileId={file._id} exportFiles={exportFiles} />
      </td>
      <td className={exportFiles}>
        <BookoutButton
          user={user}
          fileLoad={fullFileName}
          source={file.fsSource}
          fileId={file._id}
          fsBooked={file.fsBooked}
          createLog={createLog}
          deleteFile={deleteFile}
          bookoutFile={bookoutFile}
        />
      </td>
    </tr>
  );
};

export default FileRow;
