import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlerts } from "../actions";

class AllAlerts extends Component {
  componentDidMount() {
    this.props.fetchAlerts();
    console.log(this.props.alerts);
  }

  renderItems = () => {
    return this.props.alerts.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className="todo-title mr-2">
          <span className="text-info">{item.email}</span> Search for{" "}
          <span className="text-info">{item.search_term}</span> every{" "}
          <span className="text-info">{item.interval_time}</span>
        </span>
        <span style={{ rowGap: 10 }}>
          <Link to={`/alert/edit/${item.id}`} className="btn btn-secondary m-2">
            Edit
          </Link>
          <Link to={`/alert/delete/${item.id}`} className="btn btn-danger m-2 ">
            Delete
          </Link>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <div className="col-md-12 col-sm-10 mx-auto p-0">
        <div className="card p-3">
          <div className="mb-4">
            <Link to="alert/new" className="btn btn-primary">
              Add task
            </Link>
          </div>
          <ul className="list-group list-group-flush border-top-0">
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: Object.values(state.alerts.alerts),
  };
};

export default connect(mapStateToProps, { fetchAlerts })(AllAlerts);
