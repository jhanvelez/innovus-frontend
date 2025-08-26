import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const readingSessionsApi = api
  .enhanceEndpoints({ addTagTypes: ["readingSession", "reading-sessions"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      readingSessions: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/reading-sessions`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["reading-sessions"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      readingSession: builder.query({
        query: ({id}) => ({
          url: `/reading-sessions/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["reading-sessions"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
    }),
  });

export const {
  useReadingSessionQuery,
  useReadingSessionsQuery,
} = readingSessionsApi;
