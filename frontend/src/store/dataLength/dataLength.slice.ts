import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const dataLength = createSlice({
  name: 'cartState',
  initialState,
  reducers: {
    setDataLength: (state, { payload }: PayloadAction<number>) => state = payload,
  }
})

export const { actions: dataLengthActions, reducer: dataLengthReducer } = dataLength;