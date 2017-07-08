import React from 'react';
import moment from 'moment';
import ChangeComment from './change-comment';
import { sortUtcDates } from '../../utils/data-functions';

type Props = {
  log: any,
  logTab: string,
  comCurrent: string,
  onAddComment: Function,
  onApprove: any,
  onCommentChange: Function,
  onFinal: any,
  onCancel: any
};

const ChangeLog = ({ log, logTab, comCurrent, onAddComment, onApprove, onCommentChange, onFinal, onCancel }: Props) => {
  let logs = [];
  const _log = sortUtcDates(log.CC_LOG, 'CC_ActDate', 'reverse');
  const spanStyle = { color: 'blue' };
  const butGroup = { padding: 10 };
  const listStyleLi = { padding: 5 };

  if (_log !== null && _log.length !== 0) {
    logs = _log.map(log =>
      <li style={listStyleLi} key={log._id}>
        <span style={spanStyle} className="glyphicon glyphicon-edit" />{' '}
        {log.CC_Action}
        <small><em> - ({log.CC_ActBy} added on {moment(new Date(log.CC_ActDate)).format('DD/MM/YYYY')}) </em></small>
      </li>
    );
  }

  return (
    <div className={logTab}>
      <div>
        <ChangeComment onAddComment={onAddComment} onCommentChange={onCommentChange} comCurrent={comCurrent} />
      </div>
      <div className="panel panel-default panelStyle">
        <ul className="scrollable">{logs}</ul>
      </div>
      <div className="row">
        <div style={butGroup} className="pull-right">
          <button className="btn btn-info dp-margin-10-LR" onClick={onApprove}>Approval to Implement</button>
          <button className="btn btn-success dp-margin-10-LR" onClick={onFinal}>Final and Complete</button>
          <button className="btn btn-danger dp-margin-10-LR" onClick={onCancel}>Cancel / Withdrawn</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeLog;
