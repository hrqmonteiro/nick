import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import useColorData from "../../services/hooks/useColorData";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { color } = useColorData();
  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={color?.colorBackground}
      color={color?.colorText}
    >
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  );
}
