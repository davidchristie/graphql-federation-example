import Typography from "@mui/material/Typography";
import { UserSummary } from "../types/user-summary.ts";

export interface UserListProps {
  users: UserSummary[];
}

export function UserList({ users }: UserListProps): JSX.Element {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h5">{user.username}</Typography>
        </div>
      ))}
    </div>
  );
}
