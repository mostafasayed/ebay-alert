import {
  CREATE_ALERT,
  FETCH_ALERTS,
  DELETE_ALERT,
  EDIT_ALERT,
} from "../actions/types";

const initialState = {
  alerts: {},
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALERTS:
      const alerts = {};
      action.payload.forEach((alert) => {
        alerts[alert.id] = {
          id: alert.id,
          email: alert.email,
          search_term: alert.search_term,
          interval_time: alert.interval_time,
        };
      });
      return {
        ...state,
        alerts: { ...state.alerts, ...alerts },
      };
    case CREATE_ALERT:
      return {
        ...state,
        alerts: { ...state.alerts, [action.payload.id]: action.payload },
      };
    case EDIT_ALERT:
      return {
        ...state,
        alerts: { ...state.alerts, [action.payload.id]: action.payload },
      };
    case DELETE_ALERT:
      let currentAlerts = state.alerts;
      delete currentAlerts[action.payload];
      return { ...state, alerts: currentAlerts };
    default:
      return state;
  }
};

export default alertReducer;
