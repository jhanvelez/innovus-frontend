import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const subscribersApi = api
  .enhanceEndpoints({ addTagTypes: ["subscriber", "subscribers"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      subscribers: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/subscriber`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["subscribers"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      subscriber: builder.query({
        query: ({id}) => ({
          url: `/subscriber/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["subscribers"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeSubscriber: builder.mutation({
        query: (gymData) => ({
          url: "subscriber",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateSubscriber: builder.mutation({
        invalidatesTags: ["subscriber"],
        query: ({ id, active, name, email }: any) => ({
          url: `/subscriber/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleSubscriber: builder.mutation({
        invalidatesTags: ["subscriber"],
        query: ({ id, state }: any) => ({
          url: `/subscriber/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useSubscribersQuery,
  useSubscriberQuery,
  useStoreSubscriberMutation,
  useUpdateSubscriberMutation,
  useToggleSubscriberMutation,
} = subscribersApi;
