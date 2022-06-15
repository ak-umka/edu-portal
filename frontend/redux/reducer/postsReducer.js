import {
  CONFIRMED_GET_POSTS,
  CONFIRMED_GET_POST,
  COMMENTS,
  CONFIRMED_CREATE_POST,
  FAILED_CREATE_POST,
  CONFIRMED_DELETE_POST,
  FAILED_DELETE_POST,
  COMMENTS_ERROR,
  CONFIRMED_EDIT_POST,
  FAILED_EDIT_POST,
  STATUS
} from "@/redux/action/postsAction";

const initialState = {
  posts: [],
  postIsChanged: false,
  post: {
    id: "",
    title: "",
    content: "",
    photo: "",
    creator: "",
    createdAt: "",
    comment: [],
  },
  errorMessage: [],
  comment: [],
  status: "",
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRMED_CREATE_POST:
      return {
        ...state,
        post: action.payload,
        postIsChanged: true,
      };
    case FAILED_CREATE_POST:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CONFIRMED_DELETE_POST:
      return {
        ...state,
        post: {
          id: "",
          title: "",
          content: "",
          photo: "",
          creator: "",
          createdAt: "",
          comment: [],
        },
      };
    case FAILED_DELETE_POST:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case COMMENTS:
      return {
        ...state,
        comment: action.payload,
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        comment: action.payload,
      };
    case CONFIRMED_GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case CONFIRMED_GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CONFIRMED_EDIT_POST:
      return {
        ...state,
        post: action.payload,
      };
    case FAILED_EDIT_POST:
      return {
        ...state,
        post: action.payload,
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
