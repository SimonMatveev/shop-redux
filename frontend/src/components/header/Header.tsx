import { FC } from 'react';
import { NavLink, Link, } from 'react-router-dom';
import './header.scss';
import Container from '../container/Container';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';
import useActions from '../../hooks/useActions';
import { calculateTotalAmount } from '../../utils/functions';

interface IHeaderProps {
  onCheckout: boolean;
}

const Header: FC<IHeaderProps> = ({ onCheckout }) => {
  const { isLoading, data: currentUser } = useGetCurrentUserQuery(null, {});
  const { toggleCartState } = useActions();

  const handleCartClick = () => {
    toggleCartState();
  }

  return (
    <header className='header'>
      <Container newClass='header__container'>
        <Link to='/items' className='header__logo'>Shop.com</Link>
        {!isLoading &&
          <nav className='header__menu'>
            {
              currentUser ?
                <>
                  {!onCheckout &&
                    <button type='button' className='header__btns' onClick={handleCartClick} >
                      <div
                        className='header__btn'
                        aria-label='Корзина' />
                      <div className='header__btn-amount'>{calculateTotalAmount(currentUser.cart)}</div>
                    </button>}
                  <NavLink className={({ isActive }) => `header__link ${isActive ? ' header__link_active' : ''}`} to='/profile'>Профиль</NavLink>
                </> :
                <>
                  <Link className='header__link' to='/signin'>Войти</Link>
                  <Link className='header__link header__link_t_signup' to='/signup'>Зарегистрироваться</Link>
                </>
            }
          </nav>
        }
      </Container>
    </header>
  )
}

export default Header
