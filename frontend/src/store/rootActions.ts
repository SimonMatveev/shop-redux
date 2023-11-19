import { cartStateActions } from "./cart-state/cartState.slice";
import * as userActions from "./user/user.actions";

export const rootActions = {
  ...cartStateActions,
  ...userActions,
};
