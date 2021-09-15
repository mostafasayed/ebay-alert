import history from "../history";
import { alertApi, deleteData } from "../api/alertApi";
import { CREATE_ALERT, FETCH_ALERTS, DELETE_ALERT, EDIT_ALERT } from "./types";

export const fetchAlerts = () => async (dispatch) => {
  try {
    alertApi("http://localhost:8000/api/alerts/", "GET").then((data) => {
      console.log("TEST", data);
      dispatch({ type: FETCH_ALERTS, payload: data });
    });
  } catch (error) {
    // TODO throw error and handle it to show error msg to user
    console.log("Something went wrong!");
  }
};

export const createAlert = (data) => {
  return async (dispatch) => {
    try {
      alertApi("http://localhost:8000/api/alerts/", "POST", data).then(
        (data) => {
          dispatch({ type: CREATE_ALERT, payload: data });
        }
      );
    } catch (error) {
      // TODO throw error and handle it to show error msg to user
      console.log("Something went wrong!");
    }

    history.push("/");
  };
};

export const editAlert = (data) => async (dispatch) => {
  try {
    alertApi(`http://localhost:8000/api/alerts/${data.id}/`, "PUT", data).then(
      (data) => {
        dispatch({ type: EDIT_ALERT, payload: data });
      }
    );
  } catch (error) {
    // TODO throw error and handle it to show error msg to user
    console.log("Something went wrong!");
  }
  history.push("/");
};

export const deleteAlert = (id) => async (dispatch) => {
  try {
    deleteData(`http://localhost:8000/api/alerts/${id}/`).then((data) => {
      dispatch({ type: DELETE_ALERT, payload: id });
    });
  } catch (error) {
    // TODO throw error and handle it to show error msg to user
    console.log("Something went wrong!");
  }
  history.push("/");
};
