import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const metersApi = api
  .enhanceEndpoints({ addTagTypes: ["meter", "meters"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      meters: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/meter`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["meters"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      meter: builder.query({
        query: ({id}) => ({
          url: `/meter/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["meters"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeMeter: builder.mutation({
        query: (gymData) => ({
          url: "meter",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateMeter: builder.mutation({
        invalidatesTags: ["meter"],
        query: ({ id, active, name, email }: any) => ({
          url: `/meter/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleMeter: builder.mutation({
        invalidatesTags: ["meter"],
        query: ({ id, state }: any) => ({
          url: `/meter/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useMetersQuery,
  useMeterQuery,
  useStoreMeterMutation,
  useUpdateMeterMutation,
  useToggleMeterMutation,
} = metersApi;
