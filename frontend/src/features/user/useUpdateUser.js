import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { updateUser as apiUpdateUser } from "../../services/apiUsers";
import { updateProfile } from "./userSlice";
import { setIsOpen } from "../modal/modalSlice";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const activeUserId = useSelector((state) => state.user.user._id);

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess: (res) => {
      toast.success("User update successfully.");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      if (res.data.user._id === activeUserId) {
        dispatch(updateProfile(res.data.user));
      }
      setTimeout(()=>{
        dispatch(setIsOpen(false));
       },3000)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
};
