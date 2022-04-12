import useSWR from "swr";
import { Task } from "../types/dynamicsEntities";
import { fetcher } from "../utils/dataFetcher";

export const useTasks = (contactId?: string) => {
  const { data, error, mutate } = useSWR(
    contactId ? `/api/contact/${contactId}/tasks` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    tasks: data as Task[],
    isLoading: !error && !data,
    isError: error,
    mutateTasks: mutate,
  };
};
