import { camelToSnake, snakeToCamel } from "caseparser";

import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const propertiesApi = api
  .enhanceEndpoints({ addTagTypes: ["tariff", "tariffs"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      tariffs: builder.query({
        query: ({ search = "", page = 1, limit = 10 }) => ({
          url: `/rates`,
          method: RequestMethod.GET,
          params: camelToSnake({
            search,
            page,
            limit,
          }),
        }),
        providesTags: ["tariffs"],
        transformResponse: (response: any) => snakeToCamel(response),
      }),
      tariff: builder.query({
        query: ({id}) => ({
          url: `/rates/${id}`,
          method: RequestMethod.GET,
        }),
        providesTags: ["tariffs"],
        transformResponse: (response: any) => snakeToCamel(response.data),
      }),
      storeTariff: builder.mutation({
        query: (gymData) => ({
          url: "rates",
          method: RequestMethod.POST,
          body: gymData,
        }),
      }),
      updateTariff: builder.mutation({
        invalidatesTags: ["tariff"],
        query: ({ id, active, name, email }: any) => ({
          url: `/rates/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            active,
            name,
            email,
          }),
        }),
      }),
      toggleTariff: builder.mutation({
        invalidatesTags: ["tariff"],
        query: ({ id, state }: any) => ({
          url: `/rates/state/${id}`,
          method: RequestMethod.PUT,
          body: snakeToCamel({
            state
          }),
        }),
      }),
    }),
  });

export const {
  useTariffQuery,
  useTariffsQuery,
  useStoreTariffMutation,
  useUpdateTariffMutation,
  useToggleTariffMutation,
} = propertiesApi;
