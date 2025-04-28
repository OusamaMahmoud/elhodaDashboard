import { useQuery } from "@tanstack/react-query";
import { Fqs, getFq } from "../../api/fqsApi";

export const useFetchFq = (projectId: string) => {
  return useQuery<Fqs>({
    queryKey: ["fq", projectId],
    queryFn: () => getFq(projectId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!projectId,
  });
};
