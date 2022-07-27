/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Center,
  ChakraProvider,
  Flex,
  Image,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import HeadTag from "../components/global/Head";
import { Input } from "../components/painel/Forms/Input";
import { Logo } from "../components/painel/Header/Logo";
import { namecookie } from "../config/variables";
import { loginService } from "../services/AuthServices/loginService";
import useColorData from "../services/hooks/useColorData";
import { LoginValidator } from "../services/validators/LoginValidator";
import { UserType } from "../types/UserType";

export default function LoginPage() {
  const { color } = useColorData();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (values: UserType) => {
    const session = await loginService(values);
    if (session) {
      location.href = "/painel/dashboard";
    } else {
      setLoading(false);
      toast({
        title: "Não foi possível prosseguir",
        description: "E-mail e/ou senha inválidos",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    destroyCookie(null, namecookie)
  }, [])

  return (
    <div>
      <HeadTag title="Login" />
      <Flex
        w="100vw"
        h="100vh"
        bg={color.colorBackground}
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
      >
        <Flex w="100%" mb="20px" textAlign={"center"} alignItems={"center"} justifyContent="center">
          <Logo />
        </Flex>

        <Flex
          w="100%"
          maxW="360px"
          bg={color.colorContainer}
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values: UserType) => {
              setLoading(true);
              handleLogin(values);
            }}
            validationSchema={LoginValidator}
          >
            {({
              values,
              errors,
              setFieldTouched,
              touched,
              setValues,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
            }) => {
              return (
                <Form style={{ width: "100%" }}>
                  <Stack spacing="4">
                    <Input
                      type="email"
                      label="E-mail"
                      onChange={handleChange("email")}
                      value={values.email}
                      onBlur={handleBlur("email")}
                      error={errors.email}
                    />
                    <Input
                      type="password"
                      label="Senha"
                      onChange={handleChange("password")}
                      value={values.password}
                      onBlur={handleBlur("password")}
                      error={errors.password}
                    />
                  </Stack>

                  <Button
                    type="submit"
                    disabled={!isValid}
                    colorScheme="blackAlpha"
                    isLoading={loading}
                    mt={6}
                    w="100%"
                    bg={color.colorButton}
                    color={color.colorText}
                    size="lg"
                  >
                    Entrar
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Flex>
      </Flex>
    </div>
  );
}
