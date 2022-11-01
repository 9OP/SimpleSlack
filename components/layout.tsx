import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Box>
      {/* <Box marginBottom="2rem" width="100%" padding="2rem">
        <Link href="/">
          <Text fontSize="xl" fontWeight="bold" color="gray.600">
            Simple Slack
          </Text>
        </Link>
      </Box> */}
      <Box
        w={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }}
        margin="auto"
        marginTop="2rem"
      >
        {children}
      </Box>
    </Box>
  );
}
