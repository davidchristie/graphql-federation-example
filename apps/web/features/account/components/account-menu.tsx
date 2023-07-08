import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSignOut } from "../hooks/use-sign-out.ts";
import { SignedInUser } from "../types/signed-in-user.ts";

export interface AccountMenuProps {
  signedInUser: SignedInUser;
}

export function AccountMenu({ signedInUser }: AccountMenuProps) {
  const signOut = useSignOut();
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minWidth={0}
      >
        <Avatar
          size="sm"
          src="https://avatars.dicebear.com/api/male/username.svg"
        />
      </MenuButton>
      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
        </Center>
        <br />
        <Center>
          <p>{signedInUser.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Account Settings</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
