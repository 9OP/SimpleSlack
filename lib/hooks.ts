import { useQuery } from "react-query";
import { getChannelHistory, getChannels, getMembers, whoami } from "./http";

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
