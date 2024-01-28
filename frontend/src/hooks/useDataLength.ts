import { useTypedSelector } from './useTypedSelector';

const useDataLength = () => {
  const dataLength = useTypedSelector<number>((state) => state.dataLength);
  return dataLength;
};

export default useDataLength;
