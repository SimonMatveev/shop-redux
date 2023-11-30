import { FC } from 'react'
import './checkout.scss'
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi'
import Container from '../container/Container';
import Preloader from '../preloader/Preloader';
import { Navigate } from 'react-router';
import { getNameFromId } from '../../utils/functions';
import { PLATFORMS } from '../../utils/constants';

const Checkout: FC = () => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(null, {});
  const cart = currentUser!.cart;
  const isWithSale = cart.totalPrice !== cart.totalPriceWithSale;

  if (cart.items.length === 0 && !isLoading) return (<Navigate to='/items' />)
  return (
    <section className='checkout'>
      <Container>
        {!isLoading ?
          <div className='checkout__content'>
            <ul className='checkout__cart'>
              {cart.items.map((item, index) => {
                const isOnSale = item.itemInCart.price !== item.itemInCart.priceWithSale;
                const totalAmount = item.orders.reduce((acc, order) => order.amount + acc, 0);
                return (
                  <li className='checkout__cart-item' key={index}>
                    <p className='checkout__cart-title'>{item.itemInCart.name}</p>
                    <ul className='checkout__cart-platforms'>
                      {item.orders.map((order, index) => (
                        <li className='checkout__cart-platforms-item' key={index}>
                          <div className='checkout__cart-platforms-platform'>{getNameFromId(PLATFORMS, order.platform)}</div>
                          <div className='checkout__cart-platforms-amount'>{order.amount}</div>
                        </li>
                      ))}
                    </ul>
                    <div className={`checkout__cart-price${isOnSale ? ' checkout__cart-price_saleon' : ''}`}>{item.itemInCart.priceWithSale * totalAmount} руб.</div>
                    {isOnSale && <div className='checkout__cart-price-old'>{item.itemInCart.price * totalAmount} руб.</div>}
                  </li>
                )
              })}
            </ul>
            <div className='checkout__pay'>
              <div className='checkout__sum-container'>
                Итого:
                <p className={`checkout__sum${isWithSale ? ' checkout__sum-saleon' : ''}`}>
                  {cart.totalPriceWithSale}
                </p>
                {isWithSale && <p className='checkout__sumWithSale'>{cart.totalPrice}</p>}
              </div>
              <button type='button' className='checkout__btn'>Перейти к оплате</button>
            </div>
          </div>
          :
          <Preloader />
        }
      </Container>
    </section>
  )
}

export default Checkout