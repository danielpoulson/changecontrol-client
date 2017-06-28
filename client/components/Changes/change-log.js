import React from 'react';
import moment from 'moment';

type Props = {
  log: any,
  logTab: string,
  onApprove: any,
  onFinal: any,
  onCancel: any
};

const ChangeLog = ({ log, logTab, onApprove, onFinal, onCancel }: Props) => {
  let logs = [];
  const _log = log.CC_LOG;
  const spanStyle = { color: 'blue' };
  const butGroup = { padding: 10 };
  const listStyleLi = { padding: 5 };

  if (_log !== null && _log.length !== 0) {
    logs = _log.map(log => (
      <li style={listStyleLi} key={log._id}>
        <span style={spanStyle} className="glyphicon glyphicon-edit" /> Change Control : {log.CC_Action}
        <small><em> ({moment(new Date(log.CC_ActDate)).format('DD/MM/YYYY')}) {log.CC_ActBy} </em></small>
      </li>
    ));
  }

  return (
    <div className={logTab}>
      <div className="row">
        <div style={butGroup} className="col-md-7 col-md-offset-5">
          <button className="btn btn-info dp-margin-10-LR" onClick={onApprove}>Approval to Implement</button>
          <button className="btn btn-success dp-margin-10-LR" onClick={onFinal}>Final and Complete</button>
          <button className="btn btn-danger dp-margin-10-LR" onClick={onCancel}>Cancel / Withdrawn</button>
        </div>
      </div>
      <div className="panel panel-default panelStyle">
        <ul className="scrollable">{logs}</ul>
      </div>
    </div>
  );
};

export default ChangeLog;
