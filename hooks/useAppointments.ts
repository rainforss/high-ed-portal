import useSWR from "swr";
import { Appointment } from "../types/dynamicsEntities";
import { fetcher } from "../utils/dataFetcher";

export const useAppointments = (contactId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/contact/${contactId}/appointments`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    appointments: data as Appointment[],
    isLoading: !error && !data,
    isError: error,
    mutateAppointments: mutate,
  };
};
