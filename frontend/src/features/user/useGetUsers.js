import { useQuery } from "@tanstack/react-query";

import { getAllUser } from "../../services/apiUsers";

export function useGetUsers() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const { result, data: { user: users } ={} } = data || {};

  return { isLoading, error,  users, result };
}
