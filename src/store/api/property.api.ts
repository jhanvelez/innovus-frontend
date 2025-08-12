import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const propertiesApi = api
  .enhanceEndpoints({ addTagTypes: ["prooperty", "properties"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      properties: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/property`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["properties"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      property: builder.query({
        query: ({id}) => ({
          url: `/property/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["properties"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeProperty: builder.mutation({
        query: (gymData) => ({
          url: "property",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateProperty: builder.mutation({
        invalidatesTags: ["prooperty"],
        query: ({ id, active, name, email }: any) => ({
          url: `/property/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleProoperty: builder.mutation({
        invalidatesTags: ["prooperty"],
        query: ({ id, state }: any) => ({
          url: `/property/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  usePropertiesQuery,
  usePropertyQuery,
  useStorePropertyMutation,
  useUpdatePropertyMutation,
  useToggleProopertyMutation,
} = propertiesApi;
