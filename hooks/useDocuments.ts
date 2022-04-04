import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useDocuments = (applicationId?: string) => {
  const { data, error, mutate } = useSWR(
    applicationId ? `/api/applications/${applicationId}/documents` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    documents: data,
    isLoading: !error && !data,
    isError: error,
    mutateDocuments: mutate,
  };
};
