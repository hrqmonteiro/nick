import { Box, Stack, Icon, Text, Link } from "@chakra-ui/react";
import useColorData from "../../../services/hooks/useColorData";

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NavSection({ title, children }:NavSectionProps) {
  const { color } = useColorData();
  return (
    <Box>
      <Text
        fontWeight="bold"
        color={color?.colorText}
        fontSize="small"
      >
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}