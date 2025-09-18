import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const strataApi = api
  .enhanceEndpoints({ addTagTypes: ["stratum", "strata"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      strata: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/stratum`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["strata"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      stratum: builder.query({
        query: ({id}) => ({
          url: `/stratum/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["strata"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
    }),
  });

export const {
  useStrataQuery,
  useStratumQuery,
} = strataApi;
