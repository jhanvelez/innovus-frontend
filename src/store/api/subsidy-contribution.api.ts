import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const subsidyContributionsApi = api
  .enhanceEndpoints({ addTagTypes: ["subsidy-contribution", "subsidy-contributions"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      subsidyContributions: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/subsidy-contributions`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["subsidy-contributions"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      subsidyContribution: builder.query({
        query: ({id}) => ({
          url: `/subsidy-contributions/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["subsidy-contributions"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeSubsidyContributions: builder.mutation({
        query: (gymData) => ({
          url: "subsidy-contributions",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateSubsidyContributions: builder.mutation({
        invalidatesTags: ["subsidy-contribution"],
        query: ({ id, active, name, email }: any) => ({
          url: `/subsidy-contributions/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleSubsidyContributions: builder.mutation({
        invalidatesTags: ["subsidy-contribution"],
        query: ({ id, state }: any) => ({
          url: `/subsidy-contributions/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useSubsidyContributionsQuery,
  useSubsidyContributionQuery,
  useStoreSubsidyContributionsMutation,
  useUpdateSubsidyContributionsMutation,
  useToggleSubsidyContributionsMutation,
} = subsidyContributionsApi;
