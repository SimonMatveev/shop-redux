import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import Preloader from '../preloader/Preloader';
import { useGetCurrentUserQuery } from '../../store/api/users.storeApi';

interface IProtectedRouteProps {
  onlyUnauth?: boolean
}

const ProtectedRoute: FC<PropsWithChildren<IProtectedRouteProps>> = ({ children, onlyUnauth }) => {
  const { isLoading, data: currentUser } = useGetCurrentUserQuery(null, {});

  if (isLoading) return (<Preloader />);
  if ((onlyUnauth && !currentUser) || (!onlyUnauth && currentUser)) {
    return (<>{children}</>);
  } else {
    return (<Navigate to='/items' />);
  }
}

export default ProtectedRoute
