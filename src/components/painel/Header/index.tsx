import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Profile } from "./Profile";
import { Logo } from "./Logo";
import { RiMenuLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSidebarDrawer } from "../../../contexts/SidebarDrawerContext";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const [showHeaderItens, setShowHeaderItens] = useState(false);

  useEffect(() => {
    if (isWideVersion) {
      setShowHeaderItens(true);
    } else {
      setShowHeaderItens(false);
    }
  }, [isWideVersion]);

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!showHeaderItens && (
        <IconButton
          aria-label="Open sidebar"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />
      {/* {showHeaderItens && <SearchBox />} */}

      <Flex align="center" ml="auto">
        {/* <NotificationNav /> */}
        <Profile showProfileData={showHeaderItens} />
      </Flex>
    </Flex>
  );
}
