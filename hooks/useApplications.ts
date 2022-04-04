import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useApplications = (contactId?: string, applicationId?: string) => {
  const { data, error, mutate } = useSWR(
    contactId
      ? `/api/contact/${contactId}/applications`
      : applicationId
      ? `/api/applications/${applicationId}`
      : null,
    fetcher
  );

  return {
    applications: data,
    isLoading: !error && !data,
    isError: error,
    mutateApplications: mutate,
  };
};
