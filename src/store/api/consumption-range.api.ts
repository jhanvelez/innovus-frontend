import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const consumptionRangeApi = api
  .enhanceEndpoints({ addTagTypes: ["consumption-range", "consumption-ranges"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      consumptionRanges: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/consumption-ranges`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["consumption-ranges"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      consumptionRange: builder.query({
        query: ({id}) => ({
          url: `/consumption-ranges/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["consumption-ranges"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeConsumptionRange: builder.mutation({
        query: (gymData) => ({
          url: "consumption-ranges",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateConsumptionRange: builder.mutation({
        invalidatesTags: ["consumption-range"],
        query: ({ id, active, name, email }: any) => ({
          url: `/consumption-ranges/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleConsumptionRange: builder.mutation({
        invalidatesTags: ["consumption-range"],
        query: ({ id, state }: any) => ({
          url: `/consumption-ranges/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useConsumptionRangeQuery,
  useConsumptionRangesQuery,
  useStoreConsumptionRangeMutation,
  useUpdateConsumptionRangeMutation,
  useToggleConsumptionRangeMutation,
} = consumptionRangeApi;
