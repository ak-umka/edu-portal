import {
  CONFIRMED_CREATE_SCHEDULE,
  FAILED_CREATE_SCHEDULE,
  CONFIRMED_GET_SCHEDULES,
  FAILED_GET_SCHEDULES,
  CONFIRMED_DELETE_SCHEDULE,
  FAILED_DELETE_SCHEDULE,
  CONFIRMED_EDIT_SCHEDULE,
  FAILED_EDIT_SCHEDULE,
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
        error: action.payload,
      };
    case CONFIRMED_GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };
    case FAILED_GET_SCHEDULES:
      return {
        error: action.payload,
      };
    case CONFIRMED_DELETE_SCHEDULE:
      return {
        ...state,
        schedule: {
          title: "",
          schedule: "",
          creator: "",
          createdAt: "",
          id: "",
        },
      };
    case FAILED_DELETE_SCHEDULE:
      return {
        error: action.payload,
      };
    case CONFIRMED_EDIT_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case FAILED_EDIT_SCHEDULE:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
}
