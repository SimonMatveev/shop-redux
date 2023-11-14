import './app.scss'
import { Route, Routes, Navigate } from 'react-router'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi'
import ProtectedRoute from '../protected-route/ProtectedRoute'
import Profile from '../profile/Profile'
import Main from '../main/Main'
import NotFound from '../not-found/NotFound'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const App = () => {
  const { data: currentUser, isLoading } = useGetCurrentUserQuery(null, {});

  return (
    <div className='page'>
      <Routes>
        <Route path='/signin' element={
          <ProtectedRoute isLoading={isLoading} currentUser={currentUser} onlyUnauth>
            <Signin />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <ProtectedRoute isLoading={isLoading} currentUser={currentUser} onlyUnauth>
            <Signup />
          </ProtectedRoute>
        } />
        <Route path='/404' element={
          <NotFound />
        } />
        <Route path='/*' element={
          <>
            <Header currentUser={currentUser} isLoading={isLoading} />
            <Routes>
              <Route path='/profile' element={
                <ProtectedRoute isLoading={isLoading} currentUser={currentUser}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path='/' element={
                <Main />
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
