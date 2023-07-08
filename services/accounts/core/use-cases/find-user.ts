import { User } from "../entities/user.ts";
import { UserRepository } from "../ports/user-repository.ts";

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
    return {
      user,
    };
  }
}
