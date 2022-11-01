import { useQuery } from "react-query";
import { whoami } from "./http";

export const useWhoami = (code: string) =>
  useQuery("whoami", () => whoami(code));
