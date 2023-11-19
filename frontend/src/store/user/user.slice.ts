import { createSlice } from "@reduxjs/toolkit";
import { clearCart, decrementCart, getCurrentUser, incrementCart, patchUser, signinUser, signoutUser, signupUser, } from "./user.actions";
import { IInitialStateForUser, } from "../../types/types";



const initialState: IInitialStateForUser = {
  isLoading: {
    getUser: false,
    patchUser: false,
    signinUser: false,
    signupUser: false,
    signoutUser: false,
    clearCart: false,
    decrementCart: false,
    incrementCart: false,
  },
  error: {
    getUser: null,
    patchUser: null,
    signinUser: null,
    signupUser: null,
    signoutUser: null,
    clearCart: null,
    decrementCart: null,
    incrementCart: null,
  },
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading.getUser = true;
        state.error.getUser = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading.getUser = false;
        state.user = action.payload;
        state.error.getUser = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading.getUser = false;
        state.user = null;
        state.error.getUser = action.payload as string;
      })
      .addCase(patchUser.pending, state => {
        state.isLoading.patchUser = true;
        state.error.patchUser = null;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.isLoading.patchUser = false;
        state.user = action.payload;
        state.error.patchUser = null;
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.isLoading.patchUser = false;
        state.error.patchUser = action.payload as string;
      })
      .addCase(decrementCart.pending, (state, action) => {
        state.isLoading.decrementCart = true;
        state.error.decrementCart = null;
      })
      .addCase(decrementCart.fulfilled, (state, action) => {
        state.isLoading.decrementCart = false;
        state.user = action.payload;
        state.error.decrementCart = null;
      })
      .addCase(decrementCart.rejected, (state, action) => {
        state.isLoading.decrementCart = false;
        state.error.decrementCart = action.payload as string;
      })
      .addCase(incrementCart.pending, (state, action) => {
        state.isLoading.incrementCart = true;
        state.error.incrementCart = null;
      })
      .addCase(incrementCart.fulfilled, (state, action) => {
        state.isLoading.incrementCart = false;
        state.user = action.payload;
        state.error.incrementCart = null;
      })
      .addCase(incrementCart.rejected, (state, action) => {
        state.isLoading.incrementCart = false;
        state.error.incrementCart = action.payload as string;
      })
      .addCase(clearCart.pending, (state, action) => {
        state.isLoading.clearCart = true;
        state.error.clearCart = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading.clearCart = false;
        state.user = action.payload;
        state.error.clearCart = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading.clearCart = false;
        state.error.clearCart = action.payload as string;
      })
      .addCase(signinUser.pending, (state, action) => {
        state.isLoading.signinUser = true;
        state.error.signinUser = null;
        state.user = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading.signinUser = false;
        state.user = action.payload;
        state.error.signinUser = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading.signinUser = false;
        state.user = null;
        state.error.signinUser = action.payload as string;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.isLoading.signupUser = true;
        state.error.signupUser = null;
        state.user = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading.signupUser = false;
        state.user = action.payload;
        state.error.signupUser = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading.signupUser = false;
        state.user = null;
        state.error.signupUser = action.payload as string;
      })
      .addCase(signoutUser.pending, (state, action) => {
        state.isLoading.signoutUser = true;
        state.error.signupUser = null;
      })
      .addCase(signoutUser.fulfilled, (state, action) => {
        state.isLoading.signoutUser = false;
        state.user = null;
        state.error.signupUser = null;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.isLoading.signoutUser = false;
        state.error.signupUser = action.payload as string;
      })
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice;
