// pages/_app.js
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContext, ContextProvider } from "../lib/context";
import { useWhoami } from "../lib/hooks";

const queryClient = new QueryClient();

const RequiresClientSideAuth = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { token } = useContext(AppContext);
  const { data: user, isLoading } = useWhoami(token?.entity);

  useEffect(() => {
    if (!isLoading && !user?.ok) {
      const location = router.pathname;
      router.replace({
        pathname: "/login",
        hash: location, // store previous location in hash
      });
    }
  }, [isLoading, user]);

  return <>{isLoading ? <Spinner></Spinner> : children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Box marginX="auto" width="80%" marginTop="3rem">
            <RequiresClientSideAuth>
              <Component {...pageProps} />
            </RequiresClientSideAuth>
          </Box>
        </ContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
