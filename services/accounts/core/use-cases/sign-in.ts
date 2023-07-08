import { SignedInUser, signToken } from "auth-config";
import { UserRepository } from "../ports/user-repository.ts";

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignInResult {
  signedInUser: SignedInUser;
  token: string;
}

export class SignIn {
  private readonly privateKeyOrSecret: string;
  private readonly userRepository: UserRepository;

  public constructor(options: {
    privateKeyOrSecret: string;
    userRepository: UserRepository;
  }) {
    this.privateKeyOrSecret = options.privateKeyOrSecret;
    this.userRepository = options.userRepository;
  }

  public async handler(input: SignInInput): Promise<SignInResult> {
    const signedInUser = await this.userRepository.findUserByEmail(input.email);
    if (signedInUser === null) {
      throw new Error("Incorrect email or password");
    }
    const token = signToken({
      signedInUser,
      privateKeyOrSecret: this.privateKeyOrSecret,
    });
    return {
      signedInUser,
      token,
    };
  }
}
