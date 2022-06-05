import {
  CONFIRMED_CREATE_SCHEDULE,
  FAILED_CREATE_SCHEDULE,
  CONFIRMED_GET_SCHEDULES,
  FAILED_GET_SCHEDULES,
} from "../action/scheduleAction";

const initialState = {
  schedules: [],
  schedule: {
    title: "",
    schedule: "",
    creator: "",
    createdAt: "",
    id: "",
  },
  error: [],
};

export function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRMED_CREATE_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case FAILED_CREATE_SCHEDULE:
      return {
        ...state,
        error: action.payload,
      };
    case CONFIRMED_GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };
    case FAILED_GET_SCHEDULES:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
