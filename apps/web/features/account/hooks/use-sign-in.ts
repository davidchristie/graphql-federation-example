import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../../generated/graphql.ts";
import { homePath } from "../../../paths.ts";
import { setToken } from "../../../storage.ts";

export type SignIn = (input: {
  email: string;
  password: string;
}) => Promise<void>;

export function useSignIn(): SignIn {
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();
  return async (input) => {
    const result = await signIn({
      variables: {
        input,
      },
    });
    const token = result.data?.signIn.token;
    if (token !== undefined) {
      setToken(token);
      navigate(homePath);
    }
  };
}
