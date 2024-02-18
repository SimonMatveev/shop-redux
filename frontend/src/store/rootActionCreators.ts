import { cartStateActions } from './cart-state/cartState.slice';
import { dataLengthActions } from './dataLength/dataLength.slice';
import { filtersActions } from './filters/filters.slice';
import * as userActions from './user/user.actions';

export const rootActionCreators = {
  ...cartStateActions,
  ...userActions,
  ...filtersActions,
  ...dataLengthActions,
};
