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
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ArrowBack } from "../../components/icons";
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
  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.ts.getTime() - b.ts.getTime()),
    [messages]
  );

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
  const channelId = router.query.id as string;
  const { data: membersData } = useGetMembers();
  const { data: channelsData } = useGetChannels();
  const { data: historyData } = useGetChannelHistory(channelId);
  const { mutateAsync: sendMessage } = useSendMessage(channelId);
  const [message, setMessage] = useState("");

  const channel = useMemo(() => {
    return channelsData?.channels[channelId];
  }, [channelsData, channelId]);

  const sendMessageCallback = useCallback(async () => {
    await sendMessage({ message });
    setMessage("");
  }, [message]);

  const onMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  }, []);

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
            onClick={sendMessageCallback}
          >
            Send message
          </Button>
          <Textarea value={message} onChange={onMessageChange}></Textarea>
        </VStack>
      </Box>
    </Box>
  );
}
