import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';

import { Layout } from 'antd';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import history from './history';

import rootReducer from './reducer';

import Login from './Login'
import Logout from './Logout'
import Category from './Category'

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    // FIXME check props?
    localStorage.getItem("0.0.0_is_auth") != null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Layout className="layout">
            <Route path="/login" component={Login} />
            <PrivateRoute path="/logout" component={Logout} />
            <PrivateRoute exact={true} path="/" component={Category} /> {/* view root categories */}
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;