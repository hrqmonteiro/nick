/* eslint-disable @next/next/no-img-element */

import { Text } from "@chakra-ui/react";

/* eslint-disable jsx-a11y/alt-text */
export function Logo() {
  return (
    // <img src="/img/logo.png" width="164" />
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
     >
      nick
      <Text
        as="span"
        ml="1"
        color="pink.500"
      >
        .
      </Text>
    </Text>
  );
}
