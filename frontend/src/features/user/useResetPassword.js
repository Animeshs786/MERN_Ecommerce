import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { resetPassword as apiResetPassword } from "../../services/apiUsers";

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  const { mutate: resetPassword, isPending: isUpdating } = useMutation({
    mutationFn: apiResetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully.");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { resetPassword, isUpdating };
};
