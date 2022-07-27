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
import HeadTag from "../../../../../../components/global/Head";
import { Input } from "../../../../../../components/painel/Forms/Input";
import { Select } from "../../../../../../components/painel/Forms/Select";
import Layout from "../../../../../../components/painel/Layout";
import { createItemService } from "../../../../../../services/CrudServices/createItemService";
import { editItemService } from "../../../../../../services/CrudServices/editItemService";
import { findItemByIdService } from "../../../../../../services/CrudServices/findItemByIdService";
import { findItemsByUserService } from "../../../../../../services/CrudServices/findItemsByUserService";
import { findOptionsByOptionGroupService } from "../../../../../../services/CrudServices/findOptionsByOptionGroupService";
import useColorData from "../../../../../../services/hooks/useColorData";
import { OptionGroupType } from "../../../../../../types/OptionGroupType";
import { OptionType } from "../../../../../../types/OptionType";
import { ProductGroupType } from "../../../../../../types/ProductGroupType";
import { ProductOptionType } from "../../../../../../types/ProductOptionType";
import { ProductType } from "../../../../../../types/ProductType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  productId: yup.number().required("Você não selecionou o produto"),
  optionId: yup
    .number()
    .positive("Você não selecionou a opção")
    .required("Você não selecionou a opção"),
  productGroupId: yup
    .number()
    .positive("Você não selecionou a opção")
    .required("Você não selecionou o grupo"),
  stock: yup.number().required("Você não digitou o estoque"),
  price: yup.string().required("Você não digitou o preço adicional"),
  id: yup.number().required(),
});

const initialValues = {
  name: "",
  stock: 0,
  price: "",
  optionId: -1,
  productGroupId: -1,
  productId: -1,
  id: -1,
};

export default function CreateItem() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([] as OptionType[]);
  const [productOption, setProductOption] = useState({} as ProductOptionType);
  const router = useRouter();
  const { color } = useColorData();
  const toast = useToast();
  const ref = useRef<any>();
  const itemId = Number(router.query.id);
  const typeItem = "Opções disponíveis do Grupo";
  const routePage = "/painel/produtos/grupos/opcoes";
  const table = "productoptions";

  const getItem = async () => {
    const data = await findItemByIdService(table, itemId);
    if (data) {
      const item = data as ProductOptionType;
      setProductOption(item)
      ref.current.setValues({
        ...ref.current.values,
        name: item.name,
        stock: item.stock,
        price: item.price,
        optionId: item.optionId,
        productGroupId: item.productGroupId,
        productId: item.productId,
        id: item.id,
      });
      getOptions(Number(item.productGroup?.id));
    }
  };

  const getOptions = async (id: number) => {
    const data = await findOptionsByOptionGroupService("options", 0, id);
    if (data) {
      setOptions(data.itens);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getItem();
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
    const response = await editItemService(values, table);
    if (response) {
      setLoading(false);
      router.push(routePage + "/" + productOption.productGroupId);
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
      <HeadTag title={"Editar opção" + productOption.name} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Editar opção {productOption.name}
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
                        label="Nome da opção"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      {options && options.length > 0 && (
                        <Select
                          label="Valor da opção"
                          error={errors.optionId}
                          data={options}
                          onChange={handleChange("optionId")}
                          value={values.optionId}
                          onBlur={handleBlur("optionId")}
                        />
                      )}
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Preço adicional"
                        error={errors.price}
                        step="0.01"
                        type="number"
                        onChange={handleChange("price")}
                        value={values.price}
                        onBlur={handleBlur("price")}
                      />
                      <Input
                        label="Estoque desse item"
                        error={errors.stock}
                        step="0"
                        type="number"
                        onChange={handleChange("stock")}
                        value={values.stock}
                        onBlur={handleBlur("stock")}
                      />
                    </SimpleGrid>
                  </VStack>
                  <Divider my="6" borderColor="gray.700" />
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Link href={routePage + "/" + productOption.productGroupId} passHref>
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
