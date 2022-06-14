import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { postsReducer } from "@/redux/reducer/postsReducer";
import { subdReducer } from "./subdReducer";
import { scheduleReducer } from "./scheduleReducer";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  subds: subdReducer,
  schedule: scheduleReducer,
  message: messageReducer,
});

export default rootReducer;
