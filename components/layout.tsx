import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Box
      height="100vh"
      w={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }}
      margin="auto"
      padding="2rem"
    >
      {/* <Box marginBottom="2rem" width="100%" padding="2rem">
        <Link href="/">
          <Text fontSize="xl" fontWeight="bold" color="gray.600">
            Simple Slack
          </Text>
        </Link>
      </Box> */}

      {children}
    </Box>
  );
}
