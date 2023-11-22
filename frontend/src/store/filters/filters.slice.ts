import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilters } from "../../types/types";

const initialStateDefault: IFilters = {
  category: [],
  platforms: [],
  sortItem: 'name',
  sortOrder: 'asc',
  limit: '20',
};
const initialStateSaved = localStorage.getItem('filterState');

const saveToLocal = (state: IFilters) => localStorage.setItem('filterState', JSON.stringify(state));

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialStateSaved ? JSON.parse(initialStateSaved) : initialStateDefault,
  reducers: {
    setCategory: (state, { payload }: PayloadAction<{ values: any[], field: string }>) => {
      const { values, field } = payload;
      state[field] = values;
      saveToLocal(state);
    },
    resetFilters: (state) => {
      for (let key of Object.keys(state)) {
        if (key !== 'sortItem' && key !== 'sortOrder' && key !== 'limit') {
          state[key] = initialStateDefault[key]
        }
      };
      saveToLocal(state);
    },
    setLimit: (state, { payload }: PayloadAction<string>) => {
      state.limit = payload;
      saveToLocal(state);
    },
    setSorting: (state, { payload }: PayloadAction<string>) => {
      const item = payload.split('-')[0];
      const order = payload.split('-')[1];
      state.sortItem = item;
      state.sortOrder = order;
      saveToLocal(state);
    },
    setFromParams: (state, { payload: searchParams }: PayloadAction<URLSearchParams>) => {
      if (searchParams.has('sortItem')) state.sortItem = searchParams.get('sortItem');
      if (searchParams.has('sortOrder')) state.sortOrder = searchParams.get('sortOrder');
      if (searchParams.has('limit')) state.limit = searchParams.get('limit');
      if (searchParams.has('category')) state.category = searchParams.getAll('category');
      if (searchParams.has('platforms')) state.platforms = searchParams.getAll('platforms');
      saveToLocal(state);
    }
  }
})

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;