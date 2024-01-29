import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteUser as apiDeleteUser } from "../../services/apiUsers";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: apiDeleteUser,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteUser, isDeleting };
};
