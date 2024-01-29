import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteCategory as apiDeleteCategory } from "../../services/apiCategories";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: apiDeleteCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {deleteCategory,isDeleting};
};
