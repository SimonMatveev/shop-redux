import { IItem, IItemData, IItemInsert } from "../../types/types";
import { storeApi } from "./storeApi";

export const itemsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    getItems: builder.query<IItem[], null>({
      query: () => '/items',
      providesTags: () => [{
        type: 'Item',
      }],
      transformResponse: (response: IItemData) => response.data
    }),
    addItem: builder.mutation<IItemData, IItemInsert>({
      query: (data) => ({
        body: data,
        url: '/items',
        method: 'POST',
      }),
      invalidatesTags: () => [{
        type: 'Item',
      }]
    }),
  })
})

export const {
  useGetItemsQuery,
  useAddItemMutation,
} = itemsApi;