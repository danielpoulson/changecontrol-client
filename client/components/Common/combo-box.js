import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';

type Props = {
  data: [],
  name: string,
  label: string,
  onChange: Function,
  error: string,
  dpLabelCol: string,
  dpInputCol: string,
  defaultValue: any,
  value: any,
  touched: boolean
};

const ComboBox = (props: Props) => {
  const spanStyle = { color: 'red' };
  let dtStyle = {};
  const wrapperClass = 'form-group';
  if (props.touched && props.error && props.error.length > 0) {
    dtStyle = { border: '2px solid red' };
  }

  const labelClass = `control-label ${props.dpLabelCol}`;

  return (
    <div className={wrapperClass}>
      <label className={labelClass} htmlFor={props.name}>{props.label}</label>
      <div className={props.dpInputCol}>
        <Combobox
          style={dtStyle}
          valueField="id"
          textField="name"
          data={props.data}
          value={props.value}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
        />
        {props.touched && props.error && <div style={spanStyle} className="input">{props.error}</div>}
      </div>
    </div>
  );
};

export default ComboBox;
