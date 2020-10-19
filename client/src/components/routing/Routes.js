import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Feed from "../layout/Feed";
import Widgets from "../layout/Widgets";

function Routes() {
  return (
    <Fragment>
      <Sidebar />
      <Switch>
        <Route exact path='/' component={Feed} />
      </Switch>
      <Widgets />
    </Fragment>
  );
}

export default Routes;
