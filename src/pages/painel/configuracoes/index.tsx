/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import HeadTag from "../../../components/global/Head";
import { Input } from "../../../components/painel/Forms/Input";
import { Select } from "../../../components/painel/Forms/Select";
import Layout from "../../../components/painel/Layout";
import { optionGroupSelect } from "../../../data/optionGroupSelect";
import { findUserByCookieService } from "../../../services/AuthServices/findUserByCookieService";
import { createItemService } from "../../../services/CrudServices/createItemService";
import { editItemService } from "../../../services/CrudServices/editItemService";
import { findItemByIdService } from "../../../services/CrudServices/findItemByIdService";
import { findItemsByUserService } from "../../../services/CrudServices/findItemsByUserService";
import useColorData from "../../../services/hooks/useColorData";
import { uploadImageService } from "../../../services/UploadServices/uploadImageService";
import { BannerType } from "../../../types/BannerType";
import { OptionGroupType } from "../../../types/OptionGroupType";
import { ProductType } from "../../../types/ProductType";
import { UserType } from "../../../types/UserType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Você não escolheu a imagem"),
  password: yup.string().min(5, "Mínimo de 5 caracteres"),
});

const typeItem = "Configurações";
const routePage = "/painel/configuracoes";
const table = "users";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function EditItem() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { color } = useColorData();
  const toast = useToast();
  const ref = useRef<any>();
  const itemId = router.query.id;

  const viewToast = (title: string, msg: string, type: any) => {
    return toast({
      title: title,
      description: msg,
      status: type,
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  const getItem = async () => {
    const findUser = await findUserByCookieService();
    if (findUser && findUser.id) {
      const data = await findItemByIdService(table, Number(findUser.id));
      if (data) {
        const item = data as UserType;
        ref.current.setValues({
          ...ref.current.values,
          name: item.name,
          email: item.email,
          id: item.id,
        });
      }
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const editItem = async (values: BannerType) => {
    setLoading(true);
    const response = await editItemService(values, table);
    if (response) {
      setLoading(false);
      location.href = "/painel/dashboard";
    } else {
      setLoading(false);
      viewToast(
        "Erro ao editar",
        "Verifique os campos preenchidos e tente novamente.",
        "error"
      );
    }
  };

  return (
    <div>
      <HeadTag title={typeItem} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            {typeItem}
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          <Formik
            innerRef={ref}
            initialValues={initialValues}
            onSubmit={(values) => {
              setLoading(true);
              editItem(values);
            }}
            validationSchema={itemSchema}
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
                  <VStack spacing="8">
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Seu nome"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      <Input
                        label="Seu e-mail"
                        error={errors.email}
                        onChange={handleChange("email")}
                        value={values.email}
                        onBlur={handleBlur("email")}
                      />
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Sua senha (preencha apenas se quiser alterar)"
                        type="password"
                        error={errors.password}
                        onChange={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                      />
                      <Spacer />
                    </SimpleGrid>
                  </VStack>
                  <Divider my="6" borderColor="gray.700" />
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Link href={"/painel/dashboard"} passHref>
                        <Button
                          as="a"
                          bg={color.colorContainer}
                          borderWidth={1}
                          borderColor={"rgba(0,0,0,.5)"}
                        >
                          {" "}
                          Cancelar{" "}
                        </Button>
                      </Link>
                      <Button
                        bg={color.colorButton}
                        color={color.colorText}
                        type="submit"
                        isLoading={loading}
                        colorScheme={"blackAlpha"}
                      >
                        Editar
                      </Button>
                    </HStack>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Layout>
    </div>
  );
}
