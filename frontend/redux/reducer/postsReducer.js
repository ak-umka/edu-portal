import {
  CONFIRMED_GET_POSTS,
  CONFIRMED_GET_POST,
  COMMENTS,
  CONFIRMED_CREATE_POST,
} from "@/redux/action/postsAction";

const initialState = {
  posts: [],
  post: {
    id: "",
    title: "",
    content: "",
    photo: "",
    creator: "",
    createdAt: "",
    comment: [],
  },
  comment: [],
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENTS:
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
    case CONFIRMED_CREATE_POST:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
}
