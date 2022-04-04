import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useAcademicPeriods = () => {
  const { data, error, mutate } = useSWR(`/api/academic-periods`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    academicPeriods: data,
    isLoading: !error && !data,
    isError: error,
    mutateAcademicPeriods: mutate,
  };
};
