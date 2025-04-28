import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { DeleteProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";
import { deleteFqMutation } from "../../api/fqsApi";

// Custom hook for deleting a project
export const useDeleteFqMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProjectResponse, Error, any>({
    mutationFn: deleteFqMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["fqs"],
      });

      // Show a success message
      showToast("Fq has been Deleted successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
