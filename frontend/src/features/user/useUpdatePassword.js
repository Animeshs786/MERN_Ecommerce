import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { updatePassword as apiUpdatePassword } from "../../services/apiUsers";
import { updatePassword as setPassword } from "./userSlice";
import { setIsOpen } from "../modal/modalSlice";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdatePassword,
    onSuccess: () => {
      toast.success("Password Update successfully.");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      dispatch(setPassword());
      setTimeout(() => {
        dispatch(setIsOpen(false));
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePassword, isUpdating };
};
