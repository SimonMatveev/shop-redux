import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ENUM_CATEGORY,
  ENUM_FILTER_NAMES,
  ENUM_LOCAL_STORAGE,
  ENUM_PLATFORMS,
  IFilters,
} from '../../types/types';

const initialStateDefault: IFilters = {
  [ENUM_FILTER_NAMES.CATEGORY]: [],
  [ENUM_FILTER_NAMES.PLATFORMS]: [],
  sortItem: 'name',
  sortOrder: 'asc',
  limit: '12',
  page: '1',
  resetable: [ENUM_FILTER_NAMES.CATEGORY, ENUM_FILTER_NAMES.PLATFORMS],
};
const initialStateSaved = localStorage.getItem(ENUM_LOCAL_STORAGE.FILTER_STATE);

const saveToLocal = (state: IFilters) => {
  localStorage.setItem(ENUM_LOCAL_STORAGE.FILTER_STATE, JSON.stringify(state));
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialStateSaved
    ? (JSON.parse(initialStateSaved) as IFilters)
    : initialStateDefault,
  reducers: {
    setCategory: (
      state,
      { payload }: PayloadAction<{ values: any[]; field: ENUM_FILTER_NAMES }>
    ) => {
      const { values, field } = payload;
      state[field] = values;
      state.page = '1';
      saveToLocal(state);
    },
    resetFilters: (state: IFilters) => {
      for (let key of Object.keys(state)) {
        if (
          state.resetable.some((item) => item === key) &&
          !(
            state[key] === initialStateDefault[key] ||
            (typeof state[key] === 'object' && state[key].length === 0)
          )
        ) {
          state[key] = initialStateDefault[key];
          state.page = '1';
        }
      }
      saveToLocal(state);
    },
    setLimit: (state, { payload }: PayloadAction<string>) => {
      state.limit = payload;
      state.page = '1';
      saveToLocal(state);
    },
    setSorting: (state, { payload }: PayloadAction<string>) => {
      const item = payload.split('-')[0];
      const order = payload.split('-')[1];
      state.sortItem = item;
      state.sortOrder = order;
      saveToLocal(state);
    },
    setPage: (state, { payload }: PayloadAction<string>) => {
      state.page = payload;
      saveToLocal(state);
    },
    setFromParams: (state, { payload: searchParams }: PayloadAction<URLSearchParams>) => {
      if (searchParams.has('sortItem')) state.sortItem = searchParams.get('sortItem')!;
      if (searchParams.has('sortOrder')) state.sortOrder = searchParams.get('sortOrder')!;
      if (searchParams.has('limit')) state.limit = searchParams.get('limit')!;
      if (searchParams.has('category'))
        state.category = searchParams.getAll('category') as ENUM_CATEGORY[];
      if (searchParams.has('platforms'))
        state.platforms = searchParams.getAll('platforms') as ENUM_PLATFORMS[];
      if (searchParams.has('page')) state.page = searchParams.get('page')!;
      saveToLocal(state);
    },
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;
