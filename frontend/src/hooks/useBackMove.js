import { useNavigate } from "react-router-dom";

export function useBackMove() {
  const navigate = useNavigate();
  return ()=> navigate(-1);
}
