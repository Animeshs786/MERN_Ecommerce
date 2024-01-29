import { useQuery } from "@tanstack/react-query";

import { getAllProduct } from "../../services/apiProducts";

export function useGetProducts(
  queryParams,
  {
    searchFilter,
    sortFilter,
    limitFilter,
    priceFilter,
    categoryFilter,
    currentPage,
    ratingFilter,
  }={}
) {
  const { isLoading, error, data } = useQuery({
    queryKey: [
      "products",
      searchFilter,
      sortFilter,
      limitFilter,
      priceFilter,
      categoryFilter,
      currentPage,
      ratingFilter,
    ],
    queryFn: () => getAllProduct(queryParams),
  });

  const { result, totalResult, data: { product } = {} } = data || {};

  return { isLoading, error, product, result, totalResult };
}
