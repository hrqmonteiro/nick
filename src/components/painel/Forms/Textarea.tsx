import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as ChakraTextarea,
    TextareaProps as ChakraTextareaProps,
  } from "@chakra-ui/react";
  import {
    forwardRef,
    ForwardRefRenderFunction,
  } from "react";
import useColorData from "../../../services/hooks/useColorData";
  
  interface InputProps extends ChakraTextareaProps {
    name: string;
    label?: string;
    error?: string;
  }
  
  const InputBase: ForwardRefRenderFunction<
    HTMLInputElement,
    InputProps
  > = ({ name, label, error = null, ...rest }, ref) => {
    const { color } = useColorData();

    return (
      <FormControl isInvalid={!!error}>
        {!!label && (
          <FormLabel htmlFor={name}>{label}</FormLabel>
        )}
  
        <ChakraTextarea
          id={name}
          name={name} color={color.colorText}
          borderColor={color.colorBackground}
          focusBorderColor={color.colorButton}
          bg={color.colorContainer}
          _hover={{ bg: color.colorContainer }}
          variant="filled"
          size="lg"
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
  
  export const Textarea = forwardRef(InputBase);
  