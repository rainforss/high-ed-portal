import useSWR from "swr";
import { CourseHistory } from "../types/dynamicsEntities";
import { fetcher } from "../utils/dataFetcher";

export const useCourseHistories = (contactId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/contact/${contactId}/course-histories`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    courseHistories: data as CourseHistory[],
    isLoading: !error && !data,
    isError: error,
    mutateCourseHistories: mutate,
  };
};
