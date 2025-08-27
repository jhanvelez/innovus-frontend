import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const cyclesRotesApi = api
  .enhanceEndpoints({ addTagTypes: ["cycle", "cycles", "route", "routes"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      cycles: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/cycles-routes`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["cycles"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      cycle: builder.query({
        query: ({id}) => ({
          url: `/cycles-routes/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["cycles"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeCycle: builder.mutation({
        query: (gymData) => ({
          url: "cycles-routes",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateCycle: builder.mutation({
        invalidatesTags: ["cycle"],
        query: ({ id, active, name, email }: any) => ({
          url: `/cycles-routes/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleCycle: builder.mutation({
        invalidatesTags: ["cycle"],
        query: ({ id, state }: any) => ({
          url: `/cycles-routes/${id}`,
          method: RequestMethod.DELETE,
          body: snakeToCamel({
            state
          }),
        }),
      }),

      /*
        cycles-routes/:cycleId/routes, GET}
        cycles-routes/:cycleId/routes, POST}
        cycles-routes/:cycleId/routes/:routeId, PATCH}
        cycles-routes/:cycleId/routes/:routeId, DELETE}
      */

    }),
  });

export const {
  useCycleQuery,
  useCyclesQuery,
  useStoreCycleMutation,
  useUpdateCycleMutation,
  useToggleCycleMutation,
} = cyclesRotesApi;
