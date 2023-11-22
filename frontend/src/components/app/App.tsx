import './app.scss'
import { Route, Routes, Navigate, useLocation } from 'react-router'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'
import ProtectedRoute from '../protected-route/ProtectedRoute'
import Profile from '../profile/Profile'
import Main from '../main/Main'
import NotFound from '../not-found/NotFound'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ItemPage from '../item-page/ItemPage'
import useCartState from '../../hooks/useCartState'
import CartPopup from '../cart-popup/CartPopup'
import Checkout from '../checkout/Checkout'
import { CHECKOUT_PATHNAME } from '../../utils/constants'

const App = () => {
  const cartState = useCartState();
  const location = useLocation();
  const onCheckout = location.pathname === CHECKOUT_PATHNAME;

  return (
    <div className='page'>
      <Routes>
        <Route path='/signin' element={
          <ProtectedRoute onlyUnauth>
            <Signin />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <ProtectedRoute onlyUnauth>
            <Signup />
          </ProtectedRoute>
        } />
        <Route path='/404' element={
          <NotFound />
        } />
        <Route path='/*' element={
          <>
            <Header onCheckout={onCheckout} />
            <Routes>
              <Route path='/items' element={
                <Main />
              } />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path='/checkout' element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path='/items/:itemId' element={
                <ItemPage />
              } />
              <Route path='/' element={
                <Navigate to='/items' />
              } />
              <Route path='/*' element={
                <Navigate to='/404' />
              } />
            </Routes>
            <Footer />
            {(cartState && !onCheckout) &&
              <>
                <ProtectedRoute>
                  <CartPopup />
                </ProtectedRoute>
              </>
            }
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
