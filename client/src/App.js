import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Routes from "./components/routing/Routes";
import "./App.css";

const App = () => (
  <Router>
    <div className='app'>
      <Switch>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route component={Routes}></Route>
      </Switch>
    </div>
  </Router>
);

export default App;
