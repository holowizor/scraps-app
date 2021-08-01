import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";

const App = () => {
  return (
    <Switch>
      <Route exact path={["/", "/home"]} component={Home} />
    </Switch>
  );
};

export default App;