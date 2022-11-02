import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getChannelHistory,
  getChannels,
  getMembers,
  sendMessage,
  whoami,
} from "./http";

export const useWhoami = (token: string) =>
  // Stale after 500ms
  useQuery("whoami", () => whoami(token), { staleTime: 500 });

export const useGetChannels = (token: string) =>
  useQuery("getChannels", () => getChannels(token));

export const useGetChannelHistory = (token: string, channelId: string) =>
  useQuery(
    `getChannelHistory-${channelId}`,
    () => getChannelHistory(token, channelId),
    // Refetch every 1s
    { refetchInterval: 1000 }
  );

export const useGetMembers = (token: string) =>
  useQuery("getMembers", () => getMembers(token));

export const useSendMessage = (token: string, channelId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (arg: { message: string }) => sendMessage(token, channelId, arg.message),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`getChannelHistory-${channelId}`],
        });
      },
    }
  );
};
