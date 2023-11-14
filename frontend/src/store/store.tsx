import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { storeApi } from "./api/storeApi";

const reducers = combineReducers({
  [storeApi.reducerPath]: storeApi.reducer,
});

const logger = createLogger({
  collapsed: true
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(storeApi.middleware)
      .concat(logger)
})