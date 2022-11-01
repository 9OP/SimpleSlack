import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SlackLoginButton from "../components/slackLoginButton";
import { AppContext } from "../lib/context";
import { useWhoami } from "../lib/hooks";
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
  const {
    token: { set: setToken, entity: token },
  } = useContext(AppContext);
  const [error, setError] = useState("");
  const { data: user, isLoading } = useWhoami(token);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!isLoading && user?.ok) {
        router.replace("/");
      }
    })();
  }, [isLoading, user]);

  const getAccessToken = async (code: string) => {
    const token = await getToken(code, slackClientId, slackClientSecret);
    let from = router.asPath.split("#")[1] || "/"; // restore previous location if exists in hash
    from = from === "/login" ? "/" : from; // prevent redirecting on /login
    setToken(token);
    router.replace(from);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Box>
        <SlackLoginButton
          slackClientId={slackClientId}
          slackUserScopes={slackUserScopes}
          onSuccess={getAccessToken}
          onFailure={setError}
        />
        {error && (
          <Alert status="error" variant="subtle" borderRadius="6px">
            <AlertIcon />
            <Flex direction="column">
              <AlertTitle>Connection failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Flex>
          </Alert>
        )}
      </Box>
    </div>
  );
}
