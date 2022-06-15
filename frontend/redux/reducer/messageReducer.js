import { ALERT_MESSAGE } from "../action/messageAction";

const initialState = {
  message: "",
  type: "",
};

export function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALERT_MESSAGE:
      return {
        ...state,
        message: payload.message,
        type: payload.type,
      };
    default:
      return state;
  }
}
