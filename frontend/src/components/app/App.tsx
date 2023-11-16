import './app.scss'
import { Route, Routes, Navigate } from 'react-router'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'
import ProtectedRoute from '../protected-route/ProtectedRoute'
import Profile from '../profile/Profile'
import Main from '../main/Main'
import NotFound from '../not-found/NotFound'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ItemPage from '../item-page/ItemPage'

const App = () => {

  return (
    <div className='page'>
      <Routes>
        <Route path='/signin' element={
          <ProtectedRoute  onlyUnauth>
            <Signin />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <ProtectedRoute  onlyUnauth>
            <Signup />
          </ProtectedRoute>
        } />
        <Route path='/404' element={
          <NotFound />
        } />
        <Route path='/*' element={
          <>
            <Header/>
            <Routes>
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path='/' element={
                <Main />
              } />
              <Route path='/items/:itemId' element={
                <ItemPage />
              } />
              <Route path='/*' element={
                <Navigate to='/404' />
              } />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
