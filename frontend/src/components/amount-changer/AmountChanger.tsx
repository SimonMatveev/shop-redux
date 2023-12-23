import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import { useDecrementCartMutation, useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi';
import { ENUM_PLATFORMS, IItem } from '../../types/types';
import './amount-changer.scss';

interface IAmountChangerProps {
  item: IItem;
  newClass?: string;
  platformToChange: ENUM_PLATFORMS | null;
}

const AmountChanger: FC<IAmountChangerProps> = ({ item, newClass, platformToChange }) => {
  const { data } = useGetCurrentUserQuery(null, {});
  const [incrementCart, { isLoading: upIsLoading }] = useIncrementCartMutation();
  const [decrementCart, { isLoading: downIsLoading }] = useDecrementCartMutation();
  const thisItemInCart = data!.cart.items.find(cartItem => cartItem.itemInCart._id === item._id) || null;

  const thisOrderInCart = thisItemInCart?.orders?.find(order => order.platform === platformToChange) || { amount: 0 };

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (platformToChange !== null) incrementCart({ itemId: item._id, platform: platformToChange });
  }

  const handleDecrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (platformToChange !== null) decrementCart({ itemId: item._id, platform: platformToChange });
  }

  return (
    <div className={`amount-changer${newClass ? ' ' + newClass : ''}`}>
      < button
        type='button'
        className={`amount-changer__btn${downIsLoading ? ' amount-changer__btn_loading' : ''}`}
        onClick={handleDecrement}
        disabled={downIsLoading}
      >-</button>
      <span className='amount-changer__number'>{thisOrderInCart.amount}</span>
      < button
        type='button'
        className={`amount-changer__btn${upIsLoading ? ' amount-changer__btn_loading' : ''}`}
        onClick={handleIncrement}
        disabled={upIsLoading}
      >+</button>
    </div>
  )
}

export default AmountChanger
