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
import {
  useGetChannelHistory,
  useGetChannels,
  useGetMembers,
  useSendMessage,
} from "../../lib/hooks";
import { Member, Message } from "../../lib/models";

function ListMessages({
  messages,
  members,
}: {
  messages: Message[];
  members: { [id: string]: Member };
}) {
  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => b.ts.getTime() - a.ts.getTime());
  }, [messages]);

  return (
    <List>
      {sortedMessages.map((message, i) => (
        <ListItem key={i}>
          <Box
            borderRadius="6px"
            marginBottom="1rem"
            boxShadow="base"
            padding="1rem"
          >
            <Text
              fontWeight="semibold"
              fontSize="md"
              color={members[message.userId]?.admin ? "blue.500" : "black"}
            >
              {members[message.userId]?.name || message.userId}
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
  const { data: membersData } = useGetMembers(token.entity);
  const { data: channelsData } = useGetChannels(token.entity);
  const { data: historyData } = useGetChannelHistory(token.entity, id);
  const { mutateAsync: sendMessage } = useSendMessage(token.entity, id);
  const [message, setMessage] = useState("");

  const channel = useMemo(() => {
    return channelsData?.channels[id];
  }, [channelsData, id]);

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
        <ListMessages
          messages={historyData?.messages || []}
          members={membersData?.members || {}}
        />
        <VStack w="100%">
          <Button
            colorScheme="blue"
            variant="outline"
            w="100%"
            onClick={() => sendMessage({ message })}
          >
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
