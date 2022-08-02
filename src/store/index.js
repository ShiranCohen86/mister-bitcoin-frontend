import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { transferReducer } from "./reducers/transferReducer";
import { userReducer } from "./reducers/userReducer";
import { contactReducer } from "./reducers/contactReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  transferReducer,
  userReducer,
  contactReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
