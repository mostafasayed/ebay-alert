import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlertForm from "./AlertForm";

export default class AlertEdit extends Component {
  render() {
    return (
      <div className="col-md-12 col-sm-10 mx-auto p-0">
        <div className="card p-3">
          <div className="mb-4">
            <Link to="/" className="btn btn-danger">
              Back
            </Link>
          </div>
          <AlertForm alertId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}
