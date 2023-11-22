import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { storeApi } from "./api/storeApi";
import { cartStateReducer } from "./cart-state/cartState.slice";
import { userReducer } from "./user/user.slice";
import { filtersReducer } from "./filters/filters.slice";

const reducers = combineReducers({
  [storeApi.reducerPath]: storeApi.reducer,
  cartState: cartStateReducer,
  user: userReducer,
  filters: filtersReducer,
});

const logger = createLogger({
  collapsed: true
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['filters/setFromParams'],
      },
    })
      .concat(storeApi.middleware)
      .concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;
