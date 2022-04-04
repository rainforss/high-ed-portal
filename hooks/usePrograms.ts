import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const usePrograms = () => {
  const { data, error, mutate } = useSWR(`/api/programs`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    programs: data,
    isLoading: !error && !data,
    isError: error,
    mutatePrograms: mutate,
  };
};
