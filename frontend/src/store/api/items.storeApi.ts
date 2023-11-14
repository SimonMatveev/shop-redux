import { IItem, IItemData } from "../../types/types";
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

  })
})

export const { useGetItemsQuery } = itemsApi;