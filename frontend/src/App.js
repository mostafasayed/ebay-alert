import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import AllAlerts from "./components/AllAlerts";
import AlertNew from "./components/AlertNew";
import AlertEdit from "./components/AlertEdit";
import AlertDelete from "./components/AlertDelete";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="ui container">
        <h1 className="text-center my-4">Ebay Alerts</h1>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={AllAlerts} />
              <Route path="/alert/new" exact component={AlertNew} />
              <Route path="/alert/edit/:id" exact component={AlertEdit} />
              <Route path="/alert/delete/:id" exact component={AlertDelete} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
