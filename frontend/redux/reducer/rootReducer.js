import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { postsReducer } from "@/redux/reducer/postsReducer";
import { subdReducer } from "./subdReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  subds: subdReducer,
});

export default rootReducer;
