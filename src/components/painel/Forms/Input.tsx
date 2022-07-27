import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput, // importa o componente chakraInput para ser usado no componente Input
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import useColorData from "../../../services/hooks/useColorData";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: string;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error, ...rest }, ref) => {
  const { color } = useColorData();
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>{label}</FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        type={rest.type} color={color.colorText}
        borderColor={color.colorBackground}
        focusBorderColor={color.colorButton}
        bg={color.colorContainer}
        _hover={{ bg: color.colorContainer }}
        variant="filled"
        size="lg"
        ref={ref}
        {...rest}
      />

      {error && (
        <FormErrorMessage>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
