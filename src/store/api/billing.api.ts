import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const metersApi = api
  .enhanceEndpoints({ addTagTypes: ["meter", "meters"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      billings: builder.query({
        query: ({ cycleId, month, year } : { cycleId: string, month: string, year: string }) => ({
          url: `/billing/${cycleId}`,
          method: RequestMethod.GET,
          params: camelToSnake({
            month,
            year,
          }),
        }),
        providesTags: ["meters"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      billing: builder.query({
        query: ({id}) => ({
          url: `/meter/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["meters"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      generateBillingByCicle: builder.mutation({
        query: ({ cycleId, month, year } : { cycleId: string, month: string, year: string }) => ({
          url: `billing/generate/cycle/${cycleId}`,
          method: RequestMethod.POST,
          body: {
            month,
            year,
          },
        }),
      }),
    }),
  });

export const {
  useBillingsQuery,
  useBillingQuery,
  useGenerateBillingByCicleMutation,
} = metersApi;
