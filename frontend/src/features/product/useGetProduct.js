import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export const useGetProduct = (id) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const {product}= data?.data ||{};

  return { isLoading, error, product };
};
