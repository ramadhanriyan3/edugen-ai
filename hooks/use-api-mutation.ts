import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export function useApiMutation<TResponse = unknown, TPayload = unknown>(
  method: "post" | "put" | "patch" | "delete",
  url: string | ((params: string) => string),
  invalidateKey?: string[]
) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, Error, { payload?: TPayload; params?: string }>(
    {
      mutationFn: async ({ payload, params }) => {
        const finalUrl: string =
          typeof url === "function" ? url(params ?? "") : url;
        const config: AxiosRequestConfig = {
          method,
          url: finalUrl,
          headers: {
            "Content-Type": "application/json",
          },
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
