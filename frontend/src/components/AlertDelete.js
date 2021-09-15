import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Modal from "../Modal";
import { connect } from "react-redux";
import { deleteAlert } from "../actions";

class AlertDelete extends Component {
  renderContent = () => {
    return "Are you sure you want to delete this alert";
  };

  renderActions = () => (
    <>
      <button
        onClick={() => this.props.deleteAlert(this.props.match.params.id)}
        className="ui negative button"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  render() {
    return (
      <div className="ui container">
        <Modal
          header="Delete an Alert"
          body={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

export default connect(null, { deleteAlert })(AlertDelete);
