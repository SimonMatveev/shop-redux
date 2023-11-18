import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { storeApi } from "./api/storeApi";
import { cartStateReducer } from "./cart-state/cartState.slice";

const reducers = combineReducers({
  [storeApi.reducerPath]: storeApi.reducer,
  cartState:cartStateReducer,
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

export type RootState = ReturnType<typeof store.getState>;