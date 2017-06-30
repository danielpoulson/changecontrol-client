/* eslint-disable */
import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './new-date-picker.css';

type Props = {
  error: boolean,
  inputdiv: string,
  label: string,
  labelstyle: string,
  onChange: Function,
  selectedDay: string
};

const DatePicker = ({ error, label, labelstyle, onChange, selectedDay }: Props) => {
  const spanStyle = { color: 'red' };
  let dtStyle = {};
  const wrapperClass = 'form-group';

  const DAY_FORMAT = 'DD/MM/YYYY';
  const formattedDay = selectedDay ? moment(selectedDay).format(DAY_FORMAT) : '';

  if (error && error.length > 0) {
    dtStyle = { border: '2px solid red' };
  }

  return (
    <div className={wrapperClass}>
      <label className={labelstyle} htmlFor={name}>{label}</label>
      <div>
        <DayPickerInput className="dpDayPicker" value={formattedDay} onDayChange={onChange} format={DAY_FORMAT} />
      </div>
      {error && <div style={spanStyle} className="input">{error}</div>}
    </div>
  );
};

export default DatePicker;
