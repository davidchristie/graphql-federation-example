import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { homePath } from "../../../paths";
import { clearToken } from "../../../storage";

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
