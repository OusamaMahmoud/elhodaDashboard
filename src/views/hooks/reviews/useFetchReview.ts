import { useQuery } from "@tanstack/react-query";
import { getReview, Reviews } from "../../api/reviewsApi";

export const useFetchReview = (reviewId: string) => {
  return useQuery<Reviews>({
    queryKey: ["review", reviewId],
    queryFn: () => getReview(reviewId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!reviewId,
  });
};
