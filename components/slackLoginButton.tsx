import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { SlackIcon } from "./icons";

interface props {
  slackClientId: string;
  slackUserScopes: string;
  onSuccess: (code: string) => void;
  onFailure: (err: string) => void;
}

const SlackLoginButton = ({
  slackClientId,
  slackUserScopes,
  onSuccess,
  onFailure,
}: props) => {
  function openPopup() {
    const width = 400;
    const height = 600;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    const redirectUri = window.location.href.split("/").slice(0,-1).join("/")
    const url = `https://slack.com/oauth/authorize/?client_id=${slackClientId}&scope=${slackUserScopes}&redirect_uri=${redirectUri}`;

    return window.open(
      url,
      "",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }

  function handleClick() {
    const window = openPopup();
    if (window) {
      polling(window);
    }
  }

  function polling(popup: Window) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        onFailure("Popup has been closed by user");
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (!popup.location.hostname.includes("slack.com")) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);
            const slackCode = query.get("code");
            closeDialog();
            if (slackCode) {
              return onSuccess(slackCode);
            }
            if (onFailure) {
              onFailure(query?.get("error") || "");
            }
          }
        }
      } catch (err) {
        // The popup window has domain "slack.com", browser prevent
        // javascript running on localhost to access the location.hostname of the popup
        // It raises `DOMException: Blocked a frame with origin from accessing a cross-origin frame.`
        //
        // As long as the popup window is the slack oauth consent screen page, the polling is failing.
        // Once the user accept the consent screen, the popup windows redirect to "http://localhost:3000"
        // with a code in query parameter. This code is necessay to request the access token for the user.
        console.error(err)
      }
    }, 500);
  }

  return (
    <Button
      variant="outline"
      boxShadow="md"
      size="lg"
      fontSize="xl"
      width="20rem"
      _hover={{ boxShadow: "base" }}
      onClick={handleClick}
      rightIcon={<SlackIcon />}
    >
      Login with Slack
    </Button>
  );
};

export default SlackLoginButton;
