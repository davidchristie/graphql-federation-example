import { Center, CircularProgress } from "@chakra-ui/react";

export function LoadingPage(): JSX.Element {
  return (
    <Center paddingTop={20}>
      <CircularProgress isIndeterminate />
    </Center>
  );
}
