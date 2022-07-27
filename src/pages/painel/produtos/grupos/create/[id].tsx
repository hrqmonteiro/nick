/* eslint-disable react-hooks/exhaustive-deps */
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
import HeadTag from "../../../../../components/global/Head";
import { Input } from "../../../../../components/painel/Forms/Input";
import { Select } from "../../../../../components/painel/Forms/Select";
import Layout from "../../../../../components/painel/Layout";
import { createItemService } from "../../../../../services/CrudServices/createItemService";
import { findItemByIdService } from "../../../../../services/CrudServices/findItemByIdService";
import { findItemsByUserService } from "../../../../../services/CrudServices/findItemsByUserService";
import useColorData from "../../../../../services/hooks/useColorData";
import { OptionGroupType } from "../../../../../types/OptionGroupType";
import { ProductGroupType } from "../../../../../types/ProductGroupType";
import { ProductType } from "../../../../../types/ProductType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  productId: yup.number().required("Você não selecionou o produto"),
  optionGroupId: yup.number().required("Você não selecionou o grupo"),
});

const initialValues = {
  name: "",
  productId: 0,
  optionGroupId: 0,
};

export default function CreateItem() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({} as ProductType);
  const [groups, setGroups] = useState([] as OptionGroupType[]);
  const router = useRouter();
  const { color } = useColorData();
  const toast = useToast();
  const ref = useRef<any>();
  const itemId = Number(router.query.id);
  const typeItem = "Grupo de Opção do Produto";
  const routePage = "/painel/produtos";
  const table = "productgroups";

  const getProduct = async () => {
    const data = await findItemByIdService("products", itemId);
    if (data) {
      setProduct(data as ProductType);
      ref.current.setValues({...ref.current.values,productId: Number(data.id)})
    }
  };

  const getGroups = async () => {
    const data = await findItemsByUserService("optiongroups", 0);
    if (data) {
      setGroups(data.itens);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getProduct();
      getGroups();
    }
  }, [router.query.id]);

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

  const createItem = async (values: ProductGroupType) => {
    setLoading(true);
    const response = await createItemService(values, table);
    if (response) {
      setLoading(false);
      router.push(routePage + '/grupos/' + itemId);
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
      <HeadTag title={"Vincular grupo ao Produto " + product.name} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Vincular grupo ao Produto {product.name}
          </Heading>

          <Divider my="6" borderColor="gray.700" />
          <Formik
            innerRef={ref}
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
                        label="Nome do grupo"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      {groups && groups.length > 0 && (
                        <Select
                          label="Grupo de opção"
                          error={errors.optionGroupId}
                          data={groups}
                          onChange={handleChange("optionGroupId")}
                          value={values.optionGroupId}
                          onBlur={handleBlur("optionGroupId")}
                        />
                      )}
                    </SimpleGrid>
                  </VStack>
                  <Divider my="6" borderColor="gray.700" />
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Link href={routePage + '/grupos/' + itemId} passHref>
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
