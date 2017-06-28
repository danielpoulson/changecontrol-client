// @flow

import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-widgets/dist/css/react-widgets.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/font-awesome/css/font-awesome.min.css';
import './styles/styles.css';

const renderApp = () => {
  render(<Routes />, document.getElementById('app'));
};
renderApp();

if (module.hot) {
  module.hot.accept('./Routes', () => {
    renderApp();
  });
}
