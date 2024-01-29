import { useQuery } from "@tanstack/react-query";

import { getActiveUser } from "../../services/apiUsers";

export function useActiveUser() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getActiveUser,
  });

  const { data: { user } = {} } = data || {};
  return { isLoading, error, user };
}
