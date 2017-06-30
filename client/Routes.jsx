// @flow

import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import type from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
/* containers */
import App from './containers/App';
import Home from './containers/Home/home';
import Changes from './containers/Changes';
import ChangeDetail from './containers/ChangeDetail';
import PrivateRoute from './routes/PrivateRoute';
import TaskDetail from './containers/Tasks/task-details';
import Tasks from './containers/Tasks/tasks';
import User from './containers/User/user-profile';
import UserPass from './containers/User/user-pass';
import Export from './components/Files/file-export';
import Footer from './layouts/Footer';

const FourOhFour = () => <h1>404</h1>;

const Routes = () =>
  <BrowserRouter>
    <Provider store={store}>
      <div className="container">
        <App />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/changes" component={Changes} />
          <PrivateRoute path="/change/:id" component={ChangeDetail} />
          <Route path="/task/:id" component={TaskDetail} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/user" component={User} />
          <Route path="/user_pass" component={UserPass} />
          <Route path="/export" component={Export} />
          <Redirect from="/home" to="/" />
          <Route component={FourOhFour} />
        </Switch>
        <Footer />
      </div>
    </Provider>
  </BrowserRouter>;

export default Routes;
