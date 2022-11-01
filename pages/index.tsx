import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MemberIcon } from "../components/icons";
import { AppContext } from "../lib/context";
import { useGetChannels } from "../lib/hooks";
import { Channel } from "../lib/models";

const ListChannels = ({ channels }: { channels: Channel[] }) => {
  const router = useRouter();

  const redirect = (channelId: string) => {
    router.replace(`/channel/${channelId}`);
  };

  return (
    <Box>
      <List>
        {channels.map((channel) => (
          <ListItem key={channel.id}>
            <Box
              padding="1rem"
              borderRadius="6px"
              boxShadow="md"
              marginBottom="1rem"
              onClick={() => redirect(channel.id)}
              _hover={{
                boxShadow: "base",
                cursor: "pointer",
              }}
            >
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  {channel.name}
                </Text>
                <Text color="gray.600" fontWeight="bold">
                  {channel.numMembers}
                  <MemberIcon marginLeft="1rem" fontSize="1rem" />
                </Text>
              </HStack>

              <Text fontSize="sm" color="gray.600">
                {channel.created.toLocaleDateString()}
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default function Home() {
  const { token } = useContext(AppContext);
  const { data, isLoading } = useGetChannels(token?.entity);

  if (isLoading) {
    return <Box>Loading channels...</Box>;
  }

  if (!data?.ok) {
    <Alert status="error" variant="subtle" borderRadius="6px">
      <AlertIcon />
      <Flex direction="column">
        <AlertTitle>Fetching channels failed</AlertTitle>
      </Flex>
    </Alert>;
  }

  return (
    <Box>
      <Heading
        fontSize="3xl"
        marginBottom="1rem"
        bgGradient="linear(to-l, teal.500, blue.500)"
        bgClip="text"
      >
        Channels
      </Heading>
      <ListChannels channels={data?.channels || []} />
    </Box>
  );
}
