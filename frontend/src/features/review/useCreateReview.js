import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {useDispatch} from "react-redux";

import { createReview as apiCreateReview } from "../../services/apiReviews";
import { setIsOpen } from "../modal/modalSlice";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const dispatch= useDispatch();

  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: apiCreateReview,
    onSuccess: () => {
      toast.success("Review submit successfully.");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

       setTimeout(()=>{
        dispatch(setIsOpen(false));
       },3000)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createReview, isCreating };
};
