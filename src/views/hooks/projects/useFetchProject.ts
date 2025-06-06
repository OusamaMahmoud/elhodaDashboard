import { useQuery } from "@tanstack/react-query";
import { getProject, Projects } from "../../api/projectsApi";

export const useFetchProject = (projectId: string) => {
  return useQuery<Projects>({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!projectId,
  });
};
