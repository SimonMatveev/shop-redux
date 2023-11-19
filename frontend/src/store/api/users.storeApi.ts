import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IPatchMe, IUser, IUserNoPopulate, ISignin, ISignup, IError, IUserData, IClearResponse, } from "../../types/types";
import { storeApi } from "./storeApi";

export const itemsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<IUser | null, null>({
      query: () => '/users/me',
      providesTags: () => [{
        type: 'User',
      }],
      transformResponse: (response) => (response as IUserData).data
    }),
    updateUser: builder.mutation<IUserNoPopulate, IPatchMe>({
      query: ({ name, email, password }) => ({
        body: { name, email, password },
        url: '/users/me',
        method: 'PATCH',
      }),
      transformErrorResponse: (response) =>
        response.status === 'FETCH_ERROR' ? response.error : (response as IError).data.message,
      async onQueryStarted({ name, email, password }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          itemsApi.util.updateQueryData('getCurrentUser', null, (user) => {
            if (name) user.name = name;
            if (email) user.email = email;
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    incrementCart: builder.mutation<IUserNoPopulate, string>({
      query: (itemId) => ({
        body: { itemId },
        url: '/users/cart/add',
        method: 'POST',
      }),
      invalidatesTags: () => [{
        type: 'User',
      }]
    }),
    decrementCart: builder.mutation<IUserNoPopulate, string>({
      query: (itemId) => ({
        body: { itemId },
        url: '/users/cart/remove',
        method: 'POST',
      }),
      invalidatesTags: () => [{
        type: 'User',
      }]
    }),
    clearCart: builder.mutation<IClearResponse, null>({
      query: () => ({
        url: '/users/cart/clear',
        method: 'DELETE',
      }),
      invalidatesTags: () => [{
        type: 'User',
      }]
    }),
    signIn: builder.mutation<IUserNoPopulate, ISignin>({
      query: ({ email, password }) => ({
        body: { email, password },
        url: '/signin',
        method: 'POST',
      }),
      invalidatesTags: (result, error) => error ? [] : [{ type: 'User' }],
      transformErrorResponse: (response) =>
        response.status === 'FETCH_ERROR' ? response.error : (response as IError).data.message
    }),
    signUp: builder.mutation<IUserNoPopulate, ISignup>({
      query: ({ email, password, name }) => ({
        body: { email, password, name },
        url: '/signup',
        method: 'POST',
      }),
      transformErrorResponse: (response) =>
        response.status === 'FETCH_ERROR' ? response.error : (response as IError).data.message
    }),
    signOut: builder.mutation<IClearResponse, null>({
      query: () => ({
        url: '/signout',
        method: 'POST',
      }),
      transformErrorResponse: (response) =>
        response.status === 'FETCH_ERROR' ? response.error : (response as IError).data.message,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(itemsApi.util.updateQueryData('getCurrentUser', null, (user) => user = null))
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  })
})

export const {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useIncrementCartMutation,
  useDecrementCartMutation,
  useSignInMutation,
  useSignUpMutation,
  useClearCartMutation,
  useSignOutMutation,
} = itemsApi;
