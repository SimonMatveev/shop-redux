import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { rootActionCreators } from '../store/rootActionCreators';
//const rootActions = { ...actions_1, ...actions_2 }, where actionCreators are from different slices

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActionCreators, dispatch), [dispatch]);
};

export default useActions;
