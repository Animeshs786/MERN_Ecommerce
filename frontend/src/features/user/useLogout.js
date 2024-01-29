import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as apiLogout } from "../../services/apiUsers";
import { userLogout } from "./userSlice";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLogout } = useMutation({
    mutationFn: apiLogout,
    onSuccess: (res) => {
      toast.success("User Logout successfully.");
      queryClient.removeQueries();
      dispatch(userLogout());
      localStorage.removeItem("token");
      navigate("/product", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLogout };
};
