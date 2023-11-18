import { FC, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClearCartMutation, useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import AmountChanger from '../amount-changer/AmountChanger';
import './cart-popup.scss';
import useActions from '../../hooks/useActions';
import useBodyBlock from '../../hooks/useBodyBlock';

const CartPopup: FC = () => {
  const { data: currentUser } = useGetCurrentUserQuery(null, {});
  const [clearCart, { }] = useClearCartMutation();
  const cart = currentUser!.cart;
  const areItemsInCart = cart.items.length > 0;
  const isWithSale = cart.totalPrice !== cart.totalPriceWithSale;
  const { toggleCartState } = useActions();
  const cartRef = useRef<HTMLDivElement>(null);
  const { handleClose, isOpened } = useBodyBlock(toggleCartState);

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
              <div className='cart__list-wrapper'>
                <ul className='cart__list'>
                  {cart.items.map(item => {
                    const { itemInCart: game } = item
                    return (
                      <li key={game._id} className='cart__item'>
                        <p className='cart__item-title'>{game.name}</p>
                        <div className='cart__item-prices'>
                          <p className={`cart__item-price${game.priceWithSale ? ' cart__item-price_t_saleon' : ''}`}>{game.price * item.amount} руб.</p>
                          {game.priceWithSale && <p className='cart__item-price cart__item-price_t_with-sale'>{game.priceWithSale * item.amount}  руб.</p>}
                        </div>
                        <AmountChanger newClass='cart__item-controller' item={game} />
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