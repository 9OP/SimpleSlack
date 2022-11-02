import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getChannelHistory,
  getChannels,
  getMembers,
  sendMessage,
  whoami,
} from "./http";

export const useWhoami = (token: string) =>
  useQuery("whoami", () => whoami(token));

export const useGetChannels = (token: string) =>
  useQuery("getChannels", () => getChannels(token));

export const useGetChannelHistory = (token: string, channelId: string) =>
  useQuery(`getChannelHistory-${channelId}`, () =>
    getChannelHistory(token, channelId)
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
