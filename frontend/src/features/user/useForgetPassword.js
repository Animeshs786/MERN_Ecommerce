import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { forgetPassword as apiForgetPassword } from "../../services/apiUsers";
import { setIsOpen } from "../modal/modalSlice";

export const useForgetPassword = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: forgetPassword, isPending: isLoading } = useMutation({
    mutationFn: apiForgetPassword,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      setTimeout(() => {
        dispatch(setIsOpen(false));
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { forgetPassword, isLoading };
};
