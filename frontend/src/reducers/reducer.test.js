import reducer from "./alertReducer";
import { FETCH_ALERTS, CREATE_ALERT, DELETE_ALERT } from "../actions/types";

const initialState = { alerts: {} };
const oneAlertState = {
  alerts: {
    1: { id: 1, email: "test", search_term: "test", interval_time: 2 },
  },
};
const manyAlertState = {
  alerts: {
    1: { id: 1, email: "test", search_term: "test", interval_time: 2 },
    2: { id: 2, email: "test2", search_term: "test2", interval_time: 10 },
  },
};

describe("Testing Alerts Reducer", () => {
  it("Should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle Fetch alert", () => {
    const startAction = {
      type: FETCH_ALERTS,
      payload: [
        { id: 1, email: "test", search_term: "test", interval_time: 2 },
      ],
    };

    expect(reducer(initialState, startAction)).toEqual(oneAlertState);
  });

  it("Should handle Create alert", () => {
    const startAction = {
      type: CREATE_ALERT,
      payload: { id: 1, email: "test", search_term: "test", interval_time: 2 },
    };

    expect(reducer(initialState, startAction)).toEqual(oneAlertState);
  });

  it("Should handle delete alert", () => {
    const startAction = {
      type: DELETE_ALERT,
      payload: 2,
    };

    expect(reducer(manyAlertState, startAction)).toEqual(oneAlertState);
  });
});
