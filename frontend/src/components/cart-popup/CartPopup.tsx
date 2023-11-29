import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClearCartMutation, useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import AmountChanger from '../amount-changer/AmountChanger';
import './cart-popup.scss';
import useActions from '../../hooks/useActions';
import useBodyBlock from '../../hooks/useBodyBlock';
import { getNameFromId } from '../../utils/functions';
import { PLATFORMS } from '../../utils/constants';

const CartPopup: FC = () => {
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [clearCart, { }] = useClearCartMutation();
  const { toggleCartState } = useActions();
  const cartRef = useRef<HTMLDivElement>(null);
  const cartListRef = useRef<HTMLDivElement>(null);
  const { handleClose, isOpened } = useBodyBlock({
    closeCB: toggleCartState,
    scrollableItemClass: 'cart__list',
    scrollableItemParentRef: cartListRef
  });
  const cart = currentUser?.cart;
  const areItemsInCart = cart && cart.items.length > 0;
  const isWithSale = cart && cart.totalPrice !== cart.totalPriceWithSale;

  const handleCartClear = () => clearCart(null);

  const handleCloseClickCB = (e: MouseEvent) => {
    if (e.target === cartRef.current) handleClose();
  }

  const handleCloseKeyCB = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  }

  useEffect(() => {
    window.addEventListener('click', handleCloseClickCB);
    window.addEventListener('keydown', handleCloseKeyCB);
    return () => {
      window.removeEventListener('click', handleCloseClickCB);
      window.removeEventListener('keydown', handleCloseKeyCB);
    }
  }, [])

  return (
    <section className={`cart${isOpened ? ' cart_active' : ''}`} ref={cartRef}>
      <div className={`cart__wrapper ${isOpened ? ' cart__wrapper_active' : ''}`} >
        {
          areItemsInCart ?
            <>
              <div className='cart__list-wrapper' ref={cartListRef}>
                <ul className='cart__list'>
                  {cart.items.map(item => {
                    const { itemInCart: game } = item
                    const isOnSale = game.price !== game.priceWithSale;
                    const totalAmount = item.orders.reduce((acc, order) => order.amount + acc, 0);
                    return (
                      <li key={game._id} className='cart__item'>
                        <p className='cart__item-title'>{game.name}</p>
                        <div className='cart__item-prices'>
                          <p className={`cart__item-price${isOnSale ? ' cart__item-price_t_saleon' : ''}`}>{game.price * totalAmount} руб.</p>
                          {isOnSale && <p className='cart__item-price cart__item-price_t_with-sale'>{game.priceWithSale * totalAmount}  руб.</p>}
                        </div>
                        <div className='cart__amounts'>
                          {
                            item.orders.map((order, index) => (
                              <div className='cart__amount-controls' key={index}>
                                <p className='cart__amount-platform'>{getNameFromId(PLATFORMS, order.platform)}</p>
                                <AmountChanger key={index} item={game} platformToChange={order.platform} newClass='cart__amount-changer' />
                              </div>
                            ))
                          }
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className='cart__data'>
                <p className={`cart__total${isWithSale ? ' cart__total_t_saleon' : ''}`}>{cart.totalPrice} руб.</p>
                {isWithSale && <p className='cart__total cart__total_t_with-sale'>{cart.totalPriceWithSale} руб.</p>}
                <Link to='/checkout' onClick={handleClose} className='cart__button cart__button_t_checkout'>Перейти к оформлению</Link>
                <button type='button' className='cart__button cart__button_t_clear' onClick={handleCartClear}>Очистить корзину</button>
              </div>
            </> :
            <div className='cart__no-items'>Корзина пуста</div>
        }
        <button type='button' className='cart__close' onClick={handleClose}></button>
      </div>

    </section>
  )
}

export default CartPopup
