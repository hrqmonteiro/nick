/* eslint-disable react-hooks/exhaustive-deps */
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
import { Select } from "../../../components/painel/Forms/Select";
import Layout from "../../../components/painel/Layout";
import { optionGroupSelect } from "../../../data/optionGroupSelect";
import { editItemService } from "../../../services/CrudServices/editItemService";
import { findItemByIdService } from "../../../services/CrudServices/findItemByIdService";
import useColorData from "../../../services/hooks/useColorData";
import { OptionGroupType } from "../../../types/OptionGroupType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  typeOption: yup.string().required("Você não selecionou o tipo"),
  id: yup.number().required(),
});

const typeItem = "Grupo de Opção";
const routePage = "/painel/grupodeopcoes";
const table = "optiongroups";

const initialValues = {
  name: "",
  typeOption: "",
};

export default function EditItem() {
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

  const getItem = async () => {
    const idItem = Number(router.query.id);
    const data = await findItemByIdService(table, idItem);
    if (data) {
      const item = data as OptionGroupType;
      ref.current.setValues({
        ...ref.current.values,
        id: item.id,
        name: item.name,
        typeOption: item.typeOption,
      });
    }
  };

  useEffect(() => {
    if(router.query.id) {
        getItem();
    }
  }, [router.query.id]);

  const editItem = async (values: OptionGroupType) => {
    setLoading(true);
    const response = await editItemService(values, table);
    if (response) {
      setLoading(false);
      router.push(routePage);
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
      <HeadTag title={"Editar " + typeItem} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Editar {typeItem}
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
                        label="Nome do Grupo de Opção"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      <Select
                        label="Tipo das opções"
                        error={errors.typeOption}
                        data={optionGroupSelect}
                        onChange={handleChange("typeOption")}
                        value={values.typeOption}
                        onBlur={handleBlur("typeOption")}
                      />
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
