import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {useDispatch} from "react-redux";

import { createCategory as apiCreateCategory } from "../../services/apiCategories";
import { setIsOpen } from "../modal/modalSlice";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const dispatch= useDispatch();

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: apiCreateCategory,
    onSuccess: () => {
      toast.success("Category create successfully.");
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

  return {createCategory,isCreating};
};
