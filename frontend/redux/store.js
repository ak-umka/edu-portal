import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '@/redux/reducer/rootReducer';
import thunk from "redux-thunk";

const store = legacy_createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;