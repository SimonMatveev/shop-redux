import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/store';
//export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
