import { useNavigate } from "react-router-dom";
import { signInMutation } from "../../../graphql/operations/mutations/sign-in";
import { useGraphQLMutation } from "../../../graphql/use-graphql-mutation";
import { homePath } from "../../../paths";
import { setToken } from "../../../storage";

export type SignIn = (input: {
  email: string;
  password: string;
}) => Promise<void>;

export function useSignIn(): SignIn {
  const signIn = useGraphQLMutation(signInMutation);
  const navigate = useNavigate();
  return async (input) => {
    const result = await signIn.mutateAsync({ input });
    const token = result.signIn?.token;
    if (token !== undefined) {
      setToken(token);
      navigate(homePath);
    }
  };
}
