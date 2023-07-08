import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { homePath } from "../../../paths.ts";
import { clearToken } from "../../../storage.ts";

export type SignOut = () => Promise<void>;

export function useSignOut(): SignOut {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  return async () => {
    clearToken();
    apolloClient.resetStore();
    navigate(homePath);
  };
}
