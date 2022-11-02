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
  Grid,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.ts.getTime() - b.ts.getTime()),
    [messages]
  );

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  return (
    <List>
      {sortedMessages.map((message, i) => (
        <ListItem key={i}>
          <Box
            borderRadius="6px"
            marginBottom="1rem"
            borderWidth="1px"
            borderColor="gray.100"
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
      <div ref={ref}></div>
    </List>
  );
}

function Channel() {
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
  }, [message, setMessage, sendMessage]);

  const onMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  }, []);

  return (
    <Flex height="100%" flexDirection="column">
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

      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Box height="40rem"  overflow="auto">
          <ListMessages
            messages={historyData?.messages || []}
            members={membersData?.members || {}}
          />
        </Box>
        <Box w="100%">
          <Button
            colorScheme="blue"
            variant="outline"
            w="100%"
            onClick={sendMessageCallback}
            marginBottom="1rem"
          >
            Send message
          </Button>
          <Textarea value={message} onChange={onMessageChange}></Textarea>
        </Box>
      </Flex>
    </Flex>
  );
}
Channel.requireAuth = true;
export default Channel;
