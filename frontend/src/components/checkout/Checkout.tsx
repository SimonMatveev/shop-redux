import { FC, useState } from 'react';
import { Navigate } from 'react-router';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import { PLATFORMS } from '../../utils/constants';
import { calculateTotalAmount, getNameFromId } from '../../utils/functions';
import CheckoutModal from '../checkout-modal/CheckoutModal';
import Container from '../container/Container';
import Preloader from '../preloader/Preloader';
import './checkout.scss';

const Checkout: FC = () => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(null, {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = currentUser!.cart;
  const isWithSale = cart.totalPrice !== cart.totalPriceWithSale;
  const totalAmount = calculateTotalAmount(cart);

  if (cart.items.length === 0 && !isLoading) return <Navigate to='/items' />;
  return (
    <section className='checkout'>
      <Container newClass='checkout__container'>
        {!isLoading ? (
          <div className='checkout__content'>
            <div className='checkout__cart-wrapper'>
              <ul className='checkout__cart'>
                {cart.items.map((item, index) => {
                  const isOnSale =
                    item.itemInCart.price !== item.itemInCart.priceWithSale;
                  const totalAmount = item.orders.reduce(
                    (acc, order) => order.amount + acc,
                    0
                  );
                  return (
                    <li className='checkout__cart-item' key={index}>
                      <p className='checkout__cart-title'>{item.itemInCart.name}</p>
                      <ul className='checkout__cart-platforms'>
                        {item.orders.map((order, index) => (
                          <li className='checkout__cart-platforms-item' key={index}>
                            <div className='checkout__cart-platforms-platform'>
                              {getNameFromId(PLATFORMS, order.platform)}
                            </div>
                            <div className='checkout__cart-platforms-amount'>
                              {order.amount}&nbsp;шт.
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className='checkout__cart-prices'>
                        <div
                          className={`checkout__cart-price${isOnSale ? ' checkout__cart-price_saleon' : ''}`}
                        >
                          {item.itemInCart.priceWithSale * totalAmount} руб.
                        </div>
                        {isOnSale && (
                          <div className='checkout__cart-price-old'>
                            {item.itemInCart.price * totalAmount} руб.
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='checkout__pay'>
              <div className='checkout__sum-container'>
                <p className='checkout__sum-header'>
                  Итого: {totalAmount} товар
                  {totalAmount === 1
                    ? ''
                    : totalAmount % 10 < 2 || totalAmount % 10 > 4
                      ? 'ов'
                      : 'а'}
                </p>
                <p className='checkout__sum'>{cart.totalPrice} руб.</p>
                {isWithSale && (
                  <p className='checkout__sumWithSale'>
                    Выгода: <span>{cart.totalPrice - cart.totalPriceWithSale} руб.</span>
                  </p>
                )}
              </div>
              <div className='checkout__pay-bottom'>
                <p className='checkout__result'>
                  К оплате: <span>{cart.totalPriceWithSale} руб.</span>
                </p>
                <button
                  type='button'
                  className='checkout__btn'
                  onClick={() => setIsModalOpen(true)}
                >
                  Перейти к оплате
                </button>
              </div>
            </div>
            {isModalOpen && <CheckoutModal setIsOpen={setIsModalOpen} />}
          </div>
        ) : (
          <Preloader />
        )}
      </Container>
    </section>
  );
};

export default Checkout;
