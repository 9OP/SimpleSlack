// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthGuard from "../components/authGuard";
import Layout from "../components/layout";
import { ContextProvider } from "../lib/context";

const queryClient = new QueryClient();

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function App(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Layout>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              // public page
              <Component {...pageProps} />
            )}
          </Layout>
        </ContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
