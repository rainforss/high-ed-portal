import useSWR from "swr";
import { ProgramHistory } from "../types/dynamicsEntities";
import { fetcher } from "../utils/dataFetcher";

export const useProgramHistories = (contactId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/contact/${contactId}/program-histories`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    programHistories: data as ProgramHistory[],
    isLoading: !error && !data,
    isError: error,
    mutateProgramHistories: mutate,
  };
};
