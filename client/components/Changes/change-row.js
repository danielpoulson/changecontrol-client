import React from 'react';
import moment from 'moment';
import { getStatCC } from '../../utils/status';
import './change-list.css';

type Props = {
  change: any,
  getChange: any
};

const ChangeRow = ({ change, getChange }: Props) => {
  const changeTitle = `${change.CC_No} - ${change.CC_Descpt}`;
  return (
    <tr onClick={getChange.bind(null, change.CC_No)}>
      <td> {changeTitle}</td>
      <td> {change.CC_Champ} </td>
      <td> {moment(change.CC_TDate).format('DD/MM/YYYY')} </td>
      <td className="colaligncenter"><i className={getStatCC(change.CC_Stat)} /></td>
    </tr>
  );
};

export default ChangeRow;
