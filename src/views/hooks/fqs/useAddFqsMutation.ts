import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { AddProjectResponse } from "../../api/projectsApi";
import { showToast } from "../../services/ShowToast";
import { addFqsMutation } from "../../api/fqsApi";

// Custom hook for deleting a project
export const useAddFqsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addFqsMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["fqs"],
      });

      // Show a success message
      showToast("Fqs has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
