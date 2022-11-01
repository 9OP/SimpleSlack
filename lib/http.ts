export const getToken = async (
  code: string,
  clientId: string,
  clientSecret: string
): Promise<string> => {
  const url = `https://slack.com/api/oauth.access?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  /* data format:
  {
    ok: true;
    access_token: "xoxp-4303267171301-4308680866996-4319917031985-d0d71a6b88ca1d2aca3ba3e70cf57fba";
    scope: "identify,channels:history,channels:read,chat:write:user";
    user_id: "U0492L0RGVA";
    team_id: "T048X7V518V";
    enterprise_id: null;
    team_name: "simple-slack-capsule";
  }
  */
  return data["access_token"];
};

export const whoami = async (
  token: string
): Promise<{ name: string; ok: boolean }> => {
  // GET request with `Authorization: 'Bearer {code}'`
  // Does not work, as Slack API does not respond to CORS preflight.
  // reference: https://stackoverflow.com/questions/68349334/slack-api-cors-error-with-axios-in-vue-js
  // Good job Slack 👏
  const res = await fetch("https://slack.com/api/users.identity", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `token=${token}`,
  });
  const data = await res.json();
  /* data format:
  {
    ok: true,
    user: {
      name: "Fallout__Boy",
      id: "U0492L0RGVA"
    },
    team: {
      id: "T048X7V518V"
    }
  }
  */

  const name = data?.["user"]?.["name"] || "";
  const ok = data?.["ok"] || false;
  return { name, ok };
};
