import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';

//V4
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

type Props = {
  inputdiv: string,
  name: string,
  label: string,
  onChange: any,
  error: boolean,
  labelstyle: string,
  value: any,
  touched: boolean
};

const DatePicker = ({ inputdiv, name, label, onChange, error, labelstyle, value, touched }: Props) => {
  const spanStyle = { color: 'red' };
  let dtStyle = {};

  const wrapperClass = 'form-group';
  if (touched && error && error.length > 0) {
    dtStyle = { border: '2px solid red' };
  }

  const _labelstyle = labelstyle;
  const _inputdiv = inputdiv;

  return (
    <div className={wrapperClass}>
      <label className={_labelstyle} htmlFor={name}>{label}</label>
      <div className={_inputdiv}>
        <DateTimePicker
          style={dtStyle}
          format="DD/MM/YY"
          name={name}
          time={false}
          onChange={onChange}
          value={!value ? null : new Date(value)}
        />
        {touched && error && <div style={spanStyle} className="input">{error}</div>}
      </div>
    </div>
  );
};

export default DatePicker;
