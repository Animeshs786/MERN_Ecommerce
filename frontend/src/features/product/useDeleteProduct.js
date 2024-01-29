import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteProduct as apiDeleteProduct } from "../../services/apiProducts";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDelete } = useMutation({
    mutationFn: apiDeleteProduct,
    onSuccess: (res) => {
      toast.success(res);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteProduct, isDelete };
};
