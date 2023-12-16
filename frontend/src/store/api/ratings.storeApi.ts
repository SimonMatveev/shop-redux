import { IRating, IRatingsResponse, IResetRatingReqest, } from "../../types/types";
import { itemsApi } from './items.storeApi';
import { storeApi } from "./storeApi";
import { userApi } from './users.storeApi';

export const ratingsApi = storeApi.injectEndpoints({
  endpoints: builder => ({
    setRating: builder.mutation<IRatingsResponse, IRating>({
      query: ({ id, value }) => {
        return {
          url: '/ratings',
          method: 'POST',
          body: { id, value }
        }
      },
      async onCacheEntryAdded({ id, value }, { dispatch, cacheDataLoaded, getCacheEntry, }) {
        try {
          await cacheDataLoaded;
          const { amount: newAmount, rating: newRating } = getCacheEntry().data!;
          dispatch(
            userApi.util.updateQueryData('getCurrentUser', null, (user) => {
              const { ratings: userRatings } = user!;
              const userIndex = userRatings.findIndex(rating => rating.id === id);
              if (userIndex === -1) {
                userRatings.push({ id, value })
              } else userRatings[userIndex].value = value;
            }))
          dispatch(
            itemsApi.util.updateQueryData('getItem', id, (item) => {
              item.rating = newRating;
              item.ratingAmount = newAmount;
            }))
        } catch (err) {
          console.log(err)
        }
      },
      invalidatesTags: () => [{
        type: 'Item',
      }]
    }),
    resetRating: builder.mutation<IRatingsResponse, IResetRatingReqest>({
      query: ({ id }) => {
        return {
          url: '/ratings',
          method: 'DELETE',
          body: { id }
        }
      },
      async onCacheEntryAdded({ id }, { dispatch, cacheDataLoaded, getCacheEntry, }) {
        try {
          await cacheDataLoaded;
          const { amount: newAmount, rating: newRating } = getCacheEntry().data!;
          dispatch(
            userApi.util.updateQueryData('getCurrentUser', null, (user) => {
              const { ratings: userRatings } = user!;
              const userIndex = userRatings.findIndex(rating => rating.id === id);
              if (userIndex !== -1) {
                userRatings.splice(userIndex, 1);
              } 
            }))
          dispatch(
            itemsApi.util.updateQueryData('getItem', id, (item) => {
              item.rating = newRating;
              item.ratingAmount = newAmount;
            }))
        } catch (err) {
          console.log(err)
        }
      },
      invalidatesTags: () => [{
        type: 'Item',
      }]
    }),
  })
})

export const {
  useSetRatingMutation,
  useResetRatingMutation,
} = ratingsApi;