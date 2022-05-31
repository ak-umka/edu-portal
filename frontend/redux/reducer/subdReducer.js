import {
  CONFIRMED_GET_SUBDS,
  FAILED_GET_SUBDS,
  CONFIRMED_CREATE_SUBD,
  FAILED_CREATE_SUBD,
} from "../action/subdAction";

const initialState = {
  subds: [],
  subd: {
    id: "",
    title: "",
    subd: "",
    creator: "",
    createdAt: "",
  },
};

export function subdReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRMED_GET_SUBDS:
      return {
        ...state,
        subds: action.payload,
      };
    case FAILED_GET_SUBDS:
      return {
        ...state,
        subds: action.payload,
      };
    case CONFIRMED_CREATE_SUBD:
      return {
        ...state,
        subd: action.payload,
      };
    case FAILED_CREATE_SUBD:
      return {
        ...state,
        subd: action.payload,
      };
    default:
      return state;
  }
}
