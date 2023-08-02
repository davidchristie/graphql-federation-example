import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useUsers } from "../features/users/hooks/use-users.ts";
import { UserList } from "../features/users/components/user-list.tsx";

export function HomePage(): JSX.Element {
  const users = useUsers();
  return (
    <div>
      {users.isLoading && <CircularProgress />}
      {users.data && <UserList users={users.data} />}
      {users.error && <Typography>{users.error.message}</Typography>}
    </div>
  );
}
