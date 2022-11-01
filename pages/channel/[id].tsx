import { Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ArrowBack } from "../../components/icons";
import { AppContext } from "../../lib/context";
import { useGetChannelHistory } from "../../lib/hooks";

export default function Channel() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useContext(AppContext);
  const { data } = useGetChannelHistory(token?.entity, id as string);

  return (
    <Box>
      <VStack alignItems="flex-start" spacing="0">
        <Link href="/">
          <HStack
            color="blue.500"
            fontSize="xl"
            fontWeight="semibold"
            spacing="0"
          >
            <ArrowBack />
            <Text>Go back</Text>
          </HStack>
        </Link>
        <Heading>channel name</Heading>
      </VStack>
      {id}
    </Box>
  );
}
