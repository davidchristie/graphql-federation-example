import { User } from "../core/entities/user.ts";
import { UserRepository } from "../core/ports/user-repository.ts";

export class InMemoryUserRepository implements UserRepository {
  private users: User[];

  public constructor(users: User[] = []) {
    this.users = [...users];
  }

  public async findUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  public async findUsers(): Promise<User[]> {
    return [...this.users];
  }
}
