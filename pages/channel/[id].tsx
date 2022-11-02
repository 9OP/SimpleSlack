import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  List,
  ListItem,
  Button,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { ArrowBack } from "../../components/icons";
import { AppContext } from "../../lib/context";
import { useGetChannelHistory, useGetChannels } from "../../lib/hooks";
import { Message } from "../../lib/models";

function ListMessages({ messages }: { messages: Message[] }) {
  return (
    <List>
      {messages.map((message, i) => (
        <ListItem key={i}>
          <Box
            borderRadius="6px"
            marginBottom="1rem"
            boxShadow="base"
            padding="1rem"
          >
            <Text fontWeight="semibold" fontSize="md">
              {message.userId}
            </Text>
            <Text fontWeight="semibold" fontSize="sm" marginBottom="1rem">
              {message.ts.toLocaleTimeString()}
            </Text>
            <Text>{message.text}</Text>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default function Channel() {
  const router = useRouter();
  const id = router.query.id as string;
  const { token } = useContext(AppContext);
  const { data: channels } = useGetChannels(token.entity);
  const { data: history } = useGetChannelHistory(token.entity, id);
  const [message, setMessage] = useState("");

  const channel = useMemo(() => {
    return channels?.channels[id];
  }, [channels, id]);

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
        <Heading>{channel?.name}</Heading>
      </VStack>

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <ListMessages messages={history?.messages || []} />
        <VStack w="100%">
          <Button colorScheme="blue" variant="outline" w="100%">
            Send message
          </Button>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Textarea>
        </VStack>
      </Box>
    </Box>
  );
}
