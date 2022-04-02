import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useApplications = (contactId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/contact/${contactId}/applications`,
    fetcher
  );

  return {
    applications: data,
    isLoading: !error && !data,
    isError: error,
    mutateApplications: mutate,
  };
};
