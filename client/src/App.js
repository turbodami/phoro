import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Routes from "./components/routing/Routes";
import Alert from "./components/layout/Alert";
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='app'>
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route component={Routes}></Route>
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
