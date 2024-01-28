import { cartStateActions } from './cart-state/cartState.slice';
import { filtersActions } from './filters/filters.slice';
import { dataLengthActions } from './dataLength/dataLength.slice';
import * as userActions from './user/user.actions';

export const rootActions = {
  ...cartStateActions,
  ...userActions,
  ...filtersActions,
  ...dataLengthActions,
};
