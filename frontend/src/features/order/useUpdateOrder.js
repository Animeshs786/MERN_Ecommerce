import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { updateOrder as apiUpdateOrder } from "../../services/apiOrder";
import { setIsOpen } from "../modal/modalSlice";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: updateOrder, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdateOrder,
    onSuccess: () => {
      toast.success("Order update successfully.");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      setTimeout(() => {
        dispatch(setIsOpen(false));
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateOrder, isUpdating };
};
