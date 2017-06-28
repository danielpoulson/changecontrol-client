import React from 'react';

type Props = {
  name: string,
  label: string,
  onChange: any,
  placeholder: string,
  value: string,
  error: string,
  inputdiv: string,
  inputstyle: string,
  labelstyle: string,
  rows: string
}

const TextArea = ({name, label, onChange, placeholder, value, error, inputdiv, inputstyle,
   labelstyle, rows}: Props) => {
  let wrapperClass = 'form-group';
  const _inputstyle = 'form-control' || inputstyle;
  const _inputdiv = inputdiv;
  const _labelstyle = labelstyle;

  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }


  return (
    <div className={wrapperClass}>
      <label className={_labelstyle} htmlFor={name}>{label}</label>
      <div className={_inputdiv}>
        <textarea type="text"
          name={name}
          className={_inputstyle}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={onChange} />
          {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
