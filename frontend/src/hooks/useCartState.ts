import { useTypedSelector } from "./useTypedSelector";

const useCartState = () => {
  const cartState = useTypedSelector(state => state.cartState);
  return cartState;
}

export default useCartState