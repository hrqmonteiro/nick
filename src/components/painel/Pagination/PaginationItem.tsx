import { HStack, Button } from "@chakra-ui/react";
import useColorData from "../../../services/hooks/useColorData";

interface PaginationItemProps {
  isCurrent?: Boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  const { color } = useColorData();

  if (isCurrent) {
    return (
      <HStack spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bg={color.colorButton}
          color={color.colorText}
          disabled
          _disabled={{
            bgColor: color.colorButton,
            opacity: 0.5,
            cursor: "default",
          }}
        >
          {number}
        </Button>
      </HStack>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
