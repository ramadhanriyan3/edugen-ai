import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetch = <T>(key: string[], url: string) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  });
};
