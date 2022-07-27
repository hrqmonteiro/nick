import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import useUserData from "../../../services/hooks/useUserData";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useUserData();
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          {user && <Text>{user.name}</Text>}
          
          <Text color="gray.300" fontSize="small">
            {user && user.role?.slug === 'admin' && 'Admin'}
            {user && user.role?.slug === 'worker' && 'Funcionário'}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={user.name} />
    </Flex>
  );
}
