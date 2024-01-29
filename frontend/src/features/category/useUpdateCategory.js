import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {useDispatch} from "react-redux";

import { updateCategory as apiUpdateCategory } from "../../services/apiCategories";
import { setIsOpen } from "../modal/modalSlice";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const dispatch=useDispatch();

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdateCategory,
    onSuccess: () => {
      toast.success("Category update successfully.");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setTimeout(()=>{
        dispatch(setIsOpen(false));
       },3000)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCategory, isUpdating };
};
