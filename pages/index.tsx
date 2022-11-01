import { Box, Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import SlackLogin from "../components/login";
import { getToken } from "../lib/http";

interface props {
  slackClientId: string;
  slackClientSecret: string;
  slackUserScopes: string;
}

export function getStaticProps() {
  const slackClientId = process.env.SLACK_CLIENT_ID || "";
  const slackClientSecret = process.env.SLACK_CLIENT_SECRET || "";
  const slackUserScopes = process.env.SLACK_USER_SCOPES || "";
  const props: props = { slackClientId, slackUserScopes, slackClientSecret };
  return { props };
}

export default function Home({
  slackClientId,
  slackClientSecret,
  slackUserScopes,
}: props) {
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");

  const getAccessToken = async (code: string) => {
    const token = await getToken(code, slackClientId, slackClientSecret);
    setToken(token);
  };

  return (
    <div>
      <Head>
        <title>Simple Slack</title>
        <meta name="description" content="simple slack" />
      </Head>
      <Box>
        <Text>{code}</Text>
        <SlackLogin
          slackClientId={slackClientId}
          slackUserScopes={slackUserScopes}
          onSuccess={getAccessToken}
          onFailure={(e: string) => alert(e)}
        />
      </Box>
    </div>
  );
}
