import React from 'react';

type Props = {
  name: string,
  label: string,
  onChange: any,
  defaultOption: string,
  error: boolean,
  inputdiv: string,
  labelstyle: string,
  options: mixed[],
  value: any
};
// TODO: (5) @easy error box refine formatting
const SelectInput = ({ name, label, inputdiv, labelstyle, onChange, defaultOption, value, error, options }: Props) => {
  let wrapperClass = 'form-control';

  if (error) {
    wrapperClass += ' has-error';
  }

  return (
    <div className="">

      <div className="form-group">
        <label className={labelstyle} htmlFor={name}>{label}</label>
        <div className={`${inputdiv} styled`}>
          {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
          <select name={name} value={value} onChange={onChange} className={wrapperClass}>
            <option value="">{defaultOption.text}</option>
            {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
          </select>
        </div>
      </div>

    </div>
  );
};

export default SelectInput;
