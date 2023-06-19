import { SignedInUser, getSignedInUser } from "auth-config";

export interface VerifyTokenInput {
  token: string | null;
}

export interface VerifyTokenResult {
  signedInUser: SignedInUser | null;
}

export class VerifyToken {
  private readonly publicKeyOrSecret: string;

  public constructor(options: { publicKeyOrSecret: string }) {
    this.publicKeyOrSecret = options.publicKeyOrSecret;
  }

  public async handler(input: VerifyTokenInput): Promise<VerifyTokenResult> {
    if (input.token === null) {
      return {
        signedInUser: null,
      };
    }
    const signedInUser = getSignedInUser({
      token: input.token,
      publicKeyOrSecret: this.publicKeyOrSecret,
    });
    return {
      signedInUser,
    };
  }
}
