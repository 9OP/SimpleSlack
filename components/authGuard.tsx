import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWhoami } from "../lib/hooks";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: userData, isLoading } = useWhoami();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!userData?.ok) {
        router.push("/login");
      }
    }
  }, [userData, isLoading, router]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!isLoading && userData?.ok) {
    return <>{children}</>;
  }

  return null;
}
