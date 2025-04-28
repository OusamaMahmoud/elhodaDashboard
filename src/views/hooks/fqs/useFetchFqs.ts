import { useQuery } from "@tanstack/react-query";
import { Fqs, getFqs } from "../../api/fqsApi";

export const useFetchFqs = () => {
  return useQuery<Fqs[]>({
    queryKey: ["fqs"],
    queryFn: getFqs,
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
  });
};
