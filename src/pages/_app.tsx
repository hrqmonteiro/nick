import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../contexts/UserContext";
import { ColorProvider } from "../contexts/ColorContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ColorProvider>
    </ChakraProvider>
  );
}

export default MyApp;
