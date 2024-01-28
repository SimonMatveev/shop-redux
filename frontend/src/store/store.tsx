import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { storeApi } from './api/storeApi';
import { cartStateReducer } from './cart-state/cartState.slice';
import { dataLengthReducer } from './dataLength/dataLength.slice';
import { filtersReducer } from './filters/filters.slice';
import { userReducer } from './user/user.slice';

const reducers = combineReducers({
  [storeApi.reducerPath]: storeApi.reducer,
  cartState: cartStateReducer,
  user: userReducer,
  filters: filtersReducer,
  dataLength: dataLengthReducer,
});

const logger = createLogger({
  collapsed: true,
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
      .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
