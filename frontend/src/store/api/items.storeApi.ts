import { ENUM_CATEGORY, ENUM_PLATFORMS, IItem, IItemData, IItemInsert, ISingleItemData } from "../../types/types";
import { storeApi } from "./storeApi";

export const itemsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    getItems: builder.query<IItem[], { category: ENUM_CATEGORY[], platforms: ENUM_PLATFORMS[] }>({
      query: ({ category, platforms }) => {
        return {
          url: '/items',
          params: { category, platforms }
        }
      },
      providesTags: () => [{
        type: 'Item',
      }],
      transformResponse: (response: IItemData) => response.data
    }),
    getItem: builder.query<IItem, string>({
      query: (itemId) => `/items/${itemId}`,
      transformResponse: (response: ISingleItemData) => response.data
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
  useGetItemQuery,
  useAddItemMutation,
} = itemsApi;