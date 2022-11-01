import { useQuery } from "react-query";
import { getChannels, whoami } from "./http";

export const useWhoami = (token: string) =>
  useQuery("whoami", () => whoami(token));

export const useGetChannels = (token: string) =>
  useQuery("getChannels", () => getChannels(token));
