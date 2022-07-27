import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSidebarDrawer } from "../../../contexts/SidebarDrawerContext";
import useColorData from "../../../services/hooks/useColorData";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()
  const { color } = useColorData();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isDrawerSidebar) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [isDrawerSidebar]);


  if (showSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg={color?.colorBackground} color={color?.colorText} p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
    }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}