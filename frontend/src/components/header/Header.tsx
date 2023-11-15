import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.scss';
import Container from '../container/Container';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';

const Header: FC = () => {
  const { isLoading, data: currentUser } = useGetCurrentUserQuery(null, {});

  return (
    <header className='header'>
      <Container newClass='header__container'>
        <Link to='/' className='header__logo'>Shop.com</Link>
        {!isLoading &&
          <nav className='header__menu'>
            {
              currentUser ?
                <>
                  <button className='header__btn' type='button' aria-label='Корзина'></button>
                  <NavLink className={({ isActive }) => `header__link ${isActive ? ' header__link_active' : ''}`} to='/profile'>Профиль</NavLink>
                </> :
                <>
                  <Link className='header__link' to='/signin'>Войти</Link>
                  <Link className='header__link' to='/signup'>Зарегистрироваться</Link>
                </>
            }
          </nav>
        }
      </Container>
    </header>
  )
}

export default Header
