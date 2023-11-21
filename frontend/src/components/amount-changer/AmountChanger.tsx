import { FC, MouseEventHandler } from 'react';
import { useDecrementCartMutation, useGetCurrentUserQuery, useIncrementCartMutation } from '../../store/api/users.storeApi';
import { IItem } from '../../types/types';
import './amount-changer.scss';

interface IAmountChangerProps {
  item: IItem;
  newClass?: string;
}

const AmountChanger: FC<IAmountChangerProps> = ({ item, newClass }) => {
  const { data } = useGetCurrentUserQuery(null, {});
  const [incrementCart, { isLoading: upIsLoading }] = useIncrementCartMutation();
  const [decrementCart, { isLoading: downIsLoading }] = useDecrementCartMutation();
  const thisItemInCart = data?.cart.items.find(cartItem => cartItem.itemInCart._id === item._id);

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    incrementCart(item._id);
  }

  const handleDecrement: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    decrementCart(item._id);
  }

  return (
    <div className={`amount-changer${newClass ? ' ' + newClass : ''}`}>
      < button
        type='button'
        className={`amount-changer__btn${downIsLoading ? ' amount-changer__btn_loading' : ''}`}
        onClick={handleDecrement}
        disabled={downIsLoading}
      >-</button>
      <span className='amount-changer__number'>{thisItemInCart?.amount}</span>
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
