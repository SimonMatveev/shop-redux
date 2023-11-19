import { createAsyncThunk, } from "@reduxjs/toolkit";
import { BASE_URL_API } from "../../utils/config";
import { IPatchMe, ISignup, IUser } from "../../types/types";

export const getCurrentUser = createAsyncThunk<IUser, undefined>(
  'user/get',
  async (_, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/users/me`, {
        credentials: 'include'
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }

)

export const patchUser = createAsyncThunk<IUser, IPatchMe>(
  'user/patch',
  async ({ email, name, password }, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/users/me`, {
        credentials: 'include',
        method: 'PATCH',
        body: JSON.stringify({ email, name, password }),
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const decrementCart = createAsyncThunk<IUser, string>(
  'user/cart/remove',
  async (itemId, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/users/cart/remove`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(itemId)
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const incrementCart = createAsyncThunk<IUser, string>(
  'user/cart/add',
  async (itemId, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/users/cart/add`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(itemId)
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const clearCart = createAsyncThunk<IUser, undefined>(
  'user/cart/clear',
  async (_, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/users/cart/clear`, {
        credentials: 'include',
        method: 'POST',
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const signupUser = createAsyncThunk<IUser, ISignup>(
  'user/signup',
  async ({ name, email, password }, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/signup`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      const signinData = await fetch(`${BASE_URL_API}/signin`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const signinRes = await signinData.json();
      if (signinData.status < 200 || signinData.status >= 300 || !signinData) {
        return thunkApi.rejectWithValue(signinRes.message)
      }
      return signinRes.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const signinUser = createAsyncThunk<IUser, ISignup>(
  'user/signin',
  async ({ name, email, password }, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/signin`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)

export const signoutUser = createAsyncThunk<IUser, undefined>(
  'user/signout',
  async (_, thunkApi) => {
    try {
      const data = await fetch(`${BASE_URL_API}/signout`, {
        method: 'POST',
        credentials: 'include',
        
      })
      const res = await data.json();
      if (data.status < 200 || data.status >= 300 || !data) {
        return thunkApi.rejectWithValue(res.message)
      }
      return res;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message)
    }
  }
)
