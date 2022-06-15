import {
  CONFIRMED_GET_SUBDS,
  FAILED_GET_SUBDS,
  CONFIRMED_CREATE_SUBD,
  FAILED_CREATE_SUBD,
  CONFIRMED_DELETE_SUBD,
  FAILED_DELETE_SUBD,
  CONFIRMED_EDIT_SUBD,
  FAILED_EDIT_SUBD,
  STATUS,
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
  status: "",
  errorMessage: "",
  badRequest: [],
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
        errorMessage: "Something went wrong",
        badRequest: action.payload,
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
    case CONFIRMED_DELETE_SUBD:
      return {
        ...state,
        subd: {
          id: "",
          title: "",
          subd: "",
          creator: "",
          createdAt: "",
        },
      };
    case FAILED_DELETE_SUBD:
      return {
        ...state,
        subd: action.payload,
      };
    case CONFIRMED_EDIT_SUBD:
      return {
        ...state,
        subd: action.payload,
      };
    case FAILED_EDIT_SUBD:
      return {
        ...state,
        subd: action.payload,
      };
    case STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
