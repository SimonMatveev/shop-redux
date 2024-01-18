import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const cartStateSlice = createSlice({
  name: 'cartState',
  initialState,
  reducers: {
    toggleCartState: (state) => (state = !state),
  },
})

export const { actions: cartStateActions, reducer: cartStateReducer } =
  cartStateSlice
