export const getToken = async (
  code: string,
  clientId: string,
  clientSecret: string
): Promise<string> => {
  const url = `https://slack.com/api/oauth.access?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`;
  const res = await fetch(url);
  const data = await res.json();
  /* data is in format:
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
