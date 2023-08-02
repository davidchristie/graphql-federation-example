import { User } from "../entities/user.ts";

export interface UserRepository {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUsers(): Promise<User[]>;
}
