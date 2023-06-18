import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { homePath } from "../../../paths";
import { clearToken } from "../../../storage";

export type SignOut = () => Promise<void>;

export function useSignOut(): SignOut {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return async () => {
    clearToken();
    queryClient.removeQueries();
    navigate(homePath);
  };
}
