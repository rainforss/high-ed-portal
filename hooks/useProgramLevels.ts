import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useProgramLevels = () => {
  const { data, error, mutate } = useSWR(`/api/program-levels`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    programLevels: data,
    isLoading: !error && !data,
    isError: error,
    mutateProgramLevels: mutate,
  };
};
