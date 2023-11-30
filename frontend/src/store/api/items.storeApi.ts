import { IFilters, IItem, IItemData, IItemInsert, IListItem, ISingleItemData } from "../../types/types";
import { storeApi } from "./storeApi";

export const itemsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    getItems: builder.query<IItemData, IFilters>({
      query: ({ category, platforms, sortItem, sortOrder, limit, page }) => {
        return {
          url: '/items',
          params: { category, platforms, sortItem, sortOrder, limit, page }
        }
      },
      providesTags: () => [{
        type: 'Item',
      }],
    }),
    getItem: builder.query<IItem, string>({
      query: (itemId) => `/items/${itemId}`,
      transformResponse: (response: ISingleItemData) => response.data
    }),
    getSeries: builder.query<IItem[], string>({
      query: (seriesName) => `/items/series/${seriesName}`,
      transformResponse: (response: { data: IItem[] }) => response.data
    }),
    getSeriesList: builder.query<IListItem[], null>({
      query: () => `/items/series/list`,
      transformResponse: (response: { data: IListItem[] }) => response.data
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
  useGetSeriesQuery,
  useGetSeriesListQuery,
} = itemsApi;