import { User } from "../entities/user.js";
import { UserRepository } from "../ports/user-repository.js";

export interface FindUserInput {
  id: string;
}

export interface FindUserResult {
  user: User | null;
}

export class FindUser {
  private readonly userRepository: UserRepository;

  public constructor(options: { userRepository: UserRepository }) {
    this.userRepository = options.userRepository;
  }

  public async handler(input: FindUserInput): Promise<FindUserResult> {
    const user = await this.userRepository.findUserById(input.id);
    console.log(">>> USER:", user);
    return {
      user,
    };
  }
}
