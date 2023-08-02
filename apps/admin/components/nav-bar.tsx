import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function NavBar() {
  return (
    <AppBar>
      <Box padding={2}>
        <Typography variant="h5">Admin</Typography>
      </Box>
    </AppBar>
  );
}
