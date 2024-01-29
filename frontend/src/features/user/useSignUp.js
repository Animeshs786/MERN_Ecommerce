import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";  

import { signUp as apiSignUp } from "../../services/apiUsers";
import { userLogin } from "./userSlice";

export const useSingUp = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: signUp, isPending: isCreating } = useMutation({
    mutationFn: apiSignUp,
    onSuccess: (res) => {
      toast.success("User Sign up successfully.");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      dispatch(userLogin(res.data.user));
      localStorage.setItem("token", res.token);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isCreating };
};
