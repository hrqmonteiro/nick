import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
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
import Layout from "../../../components/painel/Layout";
import { createItemService } from "../../../services/CrudServices/createItemService";
import useColorData from "../../../services/hooks/useColorData";
import { CategoryType } from "../../../types/CategoryType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório")
});

const typeItem = "Categoria";
const routePage = "/painel/categorias";

const initialValues = {
  name: "",
};

export default function CreateItem() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { color } = useColorData();
  const toast = useToast();
  const ref = useRef<any>();

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

  const createItem = async (values: CategoryType) => {
    setLoading(true);
    const response = await createItemService(values, "categories");
    if (response) {
      setLoading(false);
      router.push(routePage);
    } else {
      setLoading(false);
      viewToast(
        "Erro ao cadastrar",
        "Verifique os campos preenchidos e tente novamente.",
        "error"
      );
    }
  };

  return (
    <div>
      <HeadTag title={"Criar " + typeItem} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar {typeItem}
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          <Formik innerRef={ref}
            initialValues={initialValues}
            onSubmit={(values) => {
              setLoading(true);
              createItem(values);
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
                        label="Nome da Categoria"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      <Spacer />
                    </SimpleGrid>
                  </VStack>
                  <Divider my="6" borderColor="gray.700" />
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Link href={routePage} passHref>
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
                        isLoading={loading} colorScheme={"blackAlpha"}
                      >
                        Salvar
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
