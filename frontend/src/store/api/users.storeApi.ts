import { IPatchMe, IUser, IUserNoPopulate, ISignin, ISignup, IError, IUserData, } from "../../types/types";
import { storeApi } from "./storeApi";

export const itemsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<IUser, null>({
      query: () => '/users/me',
      providesTags: () => [{
        type: 'User',
      }],
      transformResponse: (response: IUserData) => response.data.user
    }),
    updateUser: builder.mutation<IUserNoPopulate, IPatchMe>({
      query: ({ name, email }) => ({
        body: { name, email },
        url: '/users/me',
        method: 'POST',
      }),
      invalidatesTags: () => [{
        type: 'User',
      }]
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
} = itemsApi;
