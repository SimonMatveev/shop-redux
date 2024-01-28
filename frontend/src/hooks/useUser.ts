import { useTypedSelector } from './useTypedSelector';

const useUser = () => {
  const user = useTypedSelector((state) => state.user);
  return user;
};

export default useUser;
