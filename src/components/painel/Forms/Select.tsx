import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import useColorData from "../../../services/hooks/useColorData";

interface InputProps extends ChakraSelectProps {
  name?: string;
  label?: string;
  error?: string;
  data: any;
}

const InputBase: ForwardRefRenderFunction<HTMLSelectElement, InputProps> = (
  { name, label, data = [], error = null, ...rest },
  ref
) => {
  const { color } = useColorData();
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>{label}</FormLabel>
      )}

      <ChakraSelect
        id={name}
        name={name}
        borderColor={color.colorBackground}
        focusBorderColor={color.colorButton}
        bg={color.colorContainer} color={color.colorText}
        _hover={{ bg: color.colorContainer }}
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      >
        <option style={{ backgroundColor: color.colorContainer }} value="">Selecione...</option>
        {data.map((item: any) => (
          <option
            key={item.id}
            style={{ backgroundColor: color.colorContainer }}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </ChakraSelect>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(InputBase);
