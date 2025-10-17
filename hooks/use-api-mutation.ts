import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export function useApiMutation<TResponse = unknown, TPayload = unknown>(
  method: "post" | "put" | "patch" | "delete",
  url: string | ((params: string) => string),
  useFormdata?: boolean,
  invalidateKey?: string[]
) {
  const queryClient = useQueryClient();

  const useHeaders = !useFormdata
    ? {
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "multipart/form-data",
      };

  return useMutation<TResponse, Error, { payload?: TPayload; params?: string }>(
    {
      mutationFn: async ({ payload, params }) => {
        const finalUrl: string =
          typeof url === "function" ? url(params ?? "") : url;
        const config: AxiosRequestConfig = {
          method,
          url: finalUrl,
          headers: useHeaders,
        };

        if (payload !== undefined) {
          config.data = payload;
        }

        const { data } = await axios.request<TResponse>(config);
        return data;
      },
      onSuccess: () => {
        if (invalidateKey) {
          queryClient.invalidateQueries({ queryKey: invalidateKey });
        }
      },
    }
  );
}
