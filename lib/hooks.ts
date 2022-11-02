import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "./context";
import {
  getChannelHistory,
  getChannels,
  getMembers,
  getToken,
  sendMessage,
  whoami,
} from "./http";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AppContext);
  const router = useRouter();

  const logout = async () => {
    token.set("");
    await queryClient.invalidateQueries({ queryKey: ["whoami"] });
    router.push("/login");
  };
  return { logout };
};

export const useWhoami = () => {
  const { token } = useContext(AppContext);
  return useQuery("whoami", () => whoami(token.entity), { staleTime: 0 });
};

export const useGetToken = (
  slackClientId: string,
  slackClientSecret: string
) => {
  const queryClient = useQueryClient();
  const { token } = useContext(AppContext);

  return useMutation(
    (arg: { code: string }) =>
      getToken(arg.code, slackClientId, slackClientSecret),
    {
      onSuccess: async (fetchedToken) => {
        token.set(fetchedToken);
        const user = await whoami(fetchedToken);
        if (user.ok) {
          queryClient.setQueryData("whoami", user.name);
        }
      },
    }
  );
};

export const useGetChannels = () => {
  const { token } = useContext(AppContext);
  return useQuery("getChannels", () => getChannels(token.entity));
};

export const useGetChannelHistory = (channelId: string) => {
  const { token } = useContext(AppContext);

  return useQuery(
    `getChannelHistory-${channelId}`,
    () => getChannelHistory(token.entity, channelId),
    // Polling refetch every 1s
    // not optimized, but the load is absorbed by
    // the slack API, so I guess this is ok.
    { refetchInterval: 1000 }
  );
};

export const useGetMembers = () => {
  const { token } = useContext(AppContext);
  return useQuery("getMembers", () => getMembers(token.entity));
};

export const useSendMessage = (channelId: string) => {
  const queryClient = useQueryClient();
  const { token } = useContext(AppContext);

  return useMutation(
    (arg: { message: string }) =>
      sendMessage(token.entity, channelId, arg.message),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`getChannelHistory-${channelId}`],
        });
      },
    }
  );
};
