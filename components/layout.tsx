import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Box
      height="100vh"
      w={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }}
      margin="auto"
      padding="2rem"
    >
      {children}
    </Box>
  );
}
