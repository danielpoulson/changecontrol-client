import React from 'react';

class TextInput extends React.Component {
  props: {
    name: string,
    label: string,
    onChange: any,
    placeholder: string,
    value: string,
    error: boolean,
    inputdiv: string,
    inputstyle: string,
    labelstyle: string,
    type: string
  };
  render() {
    let wrapperClass = 'form-group';
    const _inputstyle = 'form-control' || this.props.inputstyle;
    const _inputdiv = this.props.inputdiv;
    const _labelstyle = this.props.labelstyle;

    if (this.props.error) {
      wrapperClass += ' has-error';
    }

    return (
      <fieldset className={wrapperClass}>
        <label className={_labelstyle} htmlFor={this.props.name}>{this.props.label}</label>
        <div className={_inputdiv}>
          <input
            type={this.props.type ? this.props.type : 'text'}
            name={this.props.name}
            className={_inputstyle}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value || ''}
            onChange={this.props.onChange}
          />
        </div>
      </fieldset>
    );
  }
}

export default TextInput;
