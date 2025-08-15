import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.innovusingenieria.com:3001/"
    : "http://localhost:3001/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      headers.set("Accept", "application/json");

      headers.set("Accept-Language", "es");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});