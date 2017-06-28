import React from 'react';
import classNames from 'classnames';
import ChangeRow from './change-row';

import './change-list.css';

type Props = {
  colSelected: string,
  changelist: any,
  getChange: any,
  sortByClick: any
};

const ChangeList = ({ colSelected, changelist, getChange, sortByClick }: Props) => {
  const _changes = changelist;
  let changes = [];

  const th1Class = classNames({
    'fa fa-sort-asc': colSelected === 'CC_No'
  });

  const th2Class = classNames({
    'fa fa-sort-asc': colSelected === 'CC_Champ'
  });

  const th3Class = classNames({
    'fa fa-sort-asc': colSelected === 'CC_TDate'
  });

  const th4Class = classNames({
    'fa fa-sort-asc': colSelected === 'CC_Stat'
  });

  if (_changes !== undefined) {
    changes = _changes.map(change => <ChangeRow key={change.CC_No} change={change} getChange={getChange} />);
  }

  return (
    <div>
      <div className="panel panel-success">
        <table className="table table-hover phange-table dp_point dpHand">
          <thead className="print-table-head">
            <tr className="dpHand">
              <th className="col-sm-8" onClick={sortByClick.bind(null, 'CC_No')}>
                Change Number and Title <span className={th1Class} />
              </th>
              <th className="col-sm-2" onClick={sortByClick.bind(null, 'CC_Champ')}>
                Owner <span className={th2Class} />
              </th>
              <th className="col-sm-1" onClick={sortByClick.bind(null, 'CC_TDate')}>
                Target <span className={th3Class} />
              </th>
              <th className="col-sm-1" onClick={sortByClick.bind(null, 'CC_Stat')}>
                Status <span className={th4Class} />
              </th>
            </tr>
          </thead>
          <tbody>{changes}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeList;
