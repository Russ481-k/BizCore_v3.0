import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "features/user";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
