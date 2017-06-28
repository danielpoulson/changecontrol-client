import React from 'react';
import './error-panel.css';

type Props = {
  errors: any
};

const ErrorPanel = ({ errors }: Props) => {
  const errorlist = errors.map((e, i) => <li key={i}><span className="fa fa-exclamation-triangle" /> - {e}</li>); // eslint-disable-line react/no-array-index-key

  return (
    <div className="alert alert-danger">
      <ul className="cc-common-error-panel-error-list-image">
        {errorlist}
      </ul>
    </div>
  );
};

export default ErrorPanel;
