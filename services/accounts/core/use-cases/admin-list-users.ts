import { User } from "../entities/user.ts";
import { UserRepository } from "../ports/user-repository.ts";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminListUsersInput {}

export interface AdminListUsersResult {
  users: User[];
}

export class AdminListUsers {
  private readonly userRepository: UserRepository;

  public constructor(options: { userRepository: UserRepository }) {
    this.userRepository = options.userRepository;
  }

  public async handler(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: AdminListUsersInput
  ): Promise<AdminListUsersResult> {
    const users = await this.userRepository.findUsers();
    return {
      users,
    };
  }
}
