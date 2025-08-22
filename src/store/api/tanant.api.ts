import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const tenantsApi = api
  .enhanceEndpoints({ addTagTypes: ["tenant", "tenants"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      tenants: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/tenant`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["tenants"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      tenant: builder.query({
        query: ({id}) => ({
          url: `/tenant/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["tenant"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeTenant: builder.mutation({
        query: (gymData) => ({
          url: "tenant",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateTenant: builder.mutation({
        invalidatesTags: ["tenant"],
        query: ({ id, active, name, email }: any) => ({
          url: `/tenant/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleTenant: builder.mutation({
        invalidatesTags: ["tenant"],
        query: ({ id, state }: any) => ({
          url: `/tenant/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useTenantsQuery,
  useTenantQuery,
  useStoreTenantMutation,
  useUpdateTenantMutation,
  useToggleTenantMutation,
} = tenantsApi;
