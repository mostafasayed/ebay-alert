import React, { Component } from "react";
import { connect } from "react-redux";
import { createAlert, editAlert } from "../actions";

class AlertForm extends Component {
  state = {
    ...this.props.alert,
    error: null,
  };

  onFormSubmit = (e) => {
    this.setState({ error: null });
    e.preventDefault();
    // Can not create alert with same search term for same email
    let sameEmailSearchAlert = this.props.alerts.filter(
      (alert) =>
        alert.email === this.state.email &&
        alert.search_term === this.state.search_term &&
        alert.id !== this.state.id
    );
    if (sameEmailSearchAlert.length === 0) {
      this.props.type === "new"
        ? this.props.createAlert(this.state)
        : this.props.editAlert(this.state);
    } else {
      this.setState({
        error: "** You can not assign same serach term for same email **",
      });
    }
  };
  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="search">Search Term</label>
          <input
            onChange={(e) => this.setState({ search_term: e.target.value })}
            value={this.state.search_term}
            type="text"
            className="form-control"
            id="search"
            placeholder="Enter search term"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interval">Select Interval (Mins)</label>
          <select
            onChange={(e) => this.setState({ interval_time: e.target.value })}
            className="form-control"
            id="interval_time"
            value={this.state.interval_time}
            required
          >
            <option>2</option>
            <option>10</option>
            <option>30</option>
          </select>
        </div>
        {this.state.error ? (
          <p className="mt-2 text-danger font-weight-bold">
            {this.state.error}
          </p>
        ) : (
          <></>
        )}
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let alert = { id: "", email: "", search_term: "", interval_time: 10 };
  let type = "new";
  if (ownProps.alertId) {
    alert = state.alerts.alerts[ownProps.alertId];
    type = "edit";
  }
  return {
    alert,
    type,
    alerts: Object.values(state.alerts.alerts),
  };
};

export default connect(mapStateToProps, { createAlert, editAlert })(AlertForm);
