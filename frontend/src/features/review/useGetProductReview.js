import { useQuery } from "@tanstack/react-query";

import { getProductReview } from "../../services/apiReviews";

export function useGetProductReview(id) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getProductReview(id),
  });

  const { result, data: { review } = {} } = data || {};

  return { isLoading, error, review, result };
}
