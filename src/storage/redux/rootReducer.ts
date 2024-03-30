import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "features/system";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
