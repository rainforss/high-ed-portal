import useSWR from "swr";
import { fetcher } from "../utils/dataFetcher";

export const useOffers = (contactId?: string, offerId?: string) => {
  const { data, error, mutate } = useSWR(
    contactId
      ? `/api/contact/${contactId}/offers`
      : offerId
      ? `/api/offers/${offerId}`
      : null,
    fetcher
  );

  return {
    offers: data,
    isLoading: !error && !data,
    isError: error,
    mutateOffers: mutate,
  };
};
