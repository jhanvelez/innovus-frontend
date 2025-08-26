import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const readingsApi = api
  .enhanceEndpoints({ addTagTypes: ["reading", "readings"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      readings: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/reading`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["readings"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      reading: builder.query({
        query: ({id}) => ({
          url: `/reading/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["readings"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
    }),
  });

export const {
  useReadingQuery,
  useReadingsQuery,
} = readingsApi;
