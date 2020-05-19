import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Vegetarian } from "./Vegetarian.js";
import { NonVegetarian } from "./NonVegetarian.js";
import { MainPage } from "./Mainpage.js";
import { Model } from "./Model.js";
import { AdminSetting } from "./AdminSetting.js";

export function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/Vegetarian"
          exact
          render={(props) => <Vegetarian {...props} model_state={Model} />}
        />
        <Route
          path="/NonVegetarian"
          exact
          render={(props) => <NonVegetarian {...props} model_state={Model} />}
        />

        <Route
          path="/"
          exact
          render={(props) => <MainPage {...props} model={Model} />}
        />
        <Route
          path="/Admin"
          exact
          render={(props) => <AdminSetting {...props} Admin_model={Model} />}
        />
      </Switch>
    </Router>
  );
}
