import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { login as apiLogin } from "../../services/apiUsers";
import { userLogin } from "./userSlice";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: apiLogin,
    onSuccess: (res) => {
      toast.success("User Login successfully.");
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

  return { login, isLogin };
};
