import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { IUser } from '../../types/types';
import Preloader from '../preloader/Preloader';

interface IProtectedRouteProps {
  isLoading: boolean;
  currentUser: IUser | undefined;
  onlyUnauth?: boolean
}

const ProtectedRoute: FC<PropsWithChildren<IProtectedRouteProps>> = ({ children, isLoading, currentUser, onlyUnauth }) => {
  if (isLoading) return (<Preloader />);
  if ((onlyUnauth && !currentUser) || (!onlyUnauth && currentUser)) {
    return (<>{children}</>);
  } else {
    return (<Navigate to='/' />);
  }
}

export default ProtectedRoute