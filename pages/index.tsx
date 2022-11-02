import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetChannels, useLogout } from "../lib/hooks";
import { Channel } from "../lib/models";

const ListChannels = ({ channels }: { channels: Channel[] }) => {
  const router = useRouter();

  const openChannel = (channelId: string) => {
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
              onClick={() => openChannel(channel.id)}
              _hover={{
                boxShadow: "base",
                cursor: "pointer",
              }}
            >
              <Text fontSize="lg" fontWeight="semibold">
                {channel.name}
              </Text>

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

function Home() {
  const { data, isLoading } = useGetChannels();
  const { logout } = useLogout();

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
      <HStack justifyContent="space-between" alignItems="center">
        <Heading
          fontSize="3xl"
          marginBottom="1rem"
          bgGradient="linear(to-l, teal.500, blue.500)"
          bgClip="text"
        >
          Channels
        </Heading>
        <Button
          variant="outline"
          colorScheme="orange"
          size="sm"
          onClick={logout}
        >
          Logout
        </Button>
      </HStack>
      <ListChannels channels={Object.values(data?.channels || [])} />
    </Box>
  );
}

Home.requireAuth = true;
export default Home;
