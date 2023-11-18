import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API } from '../../utils/config';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: ['Item', 'User',],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    credentials: 'include'
  }),
  endpoints: () => ({})
});