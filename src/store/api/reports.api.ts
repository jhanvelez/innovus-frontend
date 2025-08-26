import { api } from "@/store/api/app.api";
import { RequestMethod } from "@/utils/RequestMethod";

export const reportsApi = api
  .enhanceEndpoints({ addTagTypes: ["report", "reports"] })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      reportReadingMeters: builder.mutation<void, { sessionId: string }>({
        query: ({ sessionId }) => ({
          url: `/report/report-reading-meters/${sessionId}`,
          method: RequestMethod.GET,
          responseHandler: async (response) => {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `LECTURA MEDIDORES.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            return { data: true };
          },
        }),
        invalidatesTags: ["reports"],
      }),
    }),
  });

export const { useReportReadingMetersMutation } = reportsApi;
