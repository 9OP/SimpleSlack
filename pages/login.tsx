import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
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

export default function Login({
  slackClientId,
  slackClientSecret,
  slackUserScopes,
}: props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const getAccessToken = async (code: string) => {
    const token = await getToken(code, slackClientId, slackClientSecret);
    setToken(token);
  };

  return (
    <div>
      <Head>
        <title>Login::SimpleSlack</title>
      </Head>
      <Box>
        <SlackLogin
          slackClientId={slackClientId}
          slackUserScopes={slackUserScopes}
          onSuccess={getAccessToken}
          onFailure={setError}
        />
        {error && (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            //height="200px"
          >
            <AlertIcon />
            <AlertTitle>Connection failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Box>
    </div>
  );
}
