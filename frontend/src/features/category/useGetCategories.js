import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/apiCategories";

export const useGetCategories = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

 const {category:categories}=data?.data || {}

  return { categories, isLoading, error };
};
