// pages/_app.js
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/layout";
import { ContextProvider } from "../lib/context";
import { useWhoami } from "../lib/hooks";

const queryClient = new QueryClient();

const RequiresClientSideAuth = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { data: user, isLoading } = useWhoami();

  useEffect(() => {
    if (!isLoading && !user?.ok) {
      const location = router.pathname;
      router.replace({ pathname: "/login" });
    }
  }, [isLoading, user]);

  return <>{isLoading ? <Spinner></Spinner> : children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Layout>
            <RequiresClientSideAuth>
              <Component {...pageProps} />
            </RequiresClientSideAuth>
          </Layout>
        </ContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
