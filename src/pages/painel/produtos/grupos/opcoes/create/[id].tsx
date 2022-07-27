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
import { findItemByIdService } from "../../../../../../services/CrudServices/findItemByIdService";
import { findItemsByUserService } from "../../../../../../services/CrudServices/findItemsByUserService";
import { findOptionsByOptionGroupService } from "../../../../../../services/CrudServices/findOptionsByOptionGroupService";
import useColorData from "../../../../../../services/hooks/useColorData";
import { OptionGroupType } from "../../../../../../types/OptionGroupType";
import { OptionType } from "../../../../../../types/OptionType";
import { ProductGroupType } from "../../../../../../types/ProductGroupType";
import { ProductType } from "../../../../../../types/ProductType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  productId: yup.number().required("Você não selecionou o produto"),
  optionId: yup.number().positive("Você não selecionou a opção").required("Você não selecionou a opção"),
  productGroupId: yup.number().positive("Você não selecionou a opção").required("Você não selecionou o grupo"),
  stock: yup.number().required("Você não digitou o estoque"),
  price: yup.string().required("Você não digitou o preço adicional"),
});

const initialValues = {
  name: "",
  stock: 0,
  price: "",
  optionId: -1,
  productGroupId: -1,
  productId: -1
};

export default function CreateItem() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({} as ProductType);
  const [productGroup, setProductGroup] = useState({} as ProductGroupType);
  const [options, setOptions] = useState([] as OptionType[]);
  const router = useRouter();
  const { color } = useColorData();
  const toast = useToast();
  const ref = useRef<any>();
  const itemId = Number(router.query.id);
  const typeItem = "Opções disponíveis do Grupo";
  const routePage = "/painel/produtos/grupos/opcoes";
  const table = "productoptions";

  const getProductGroup = async () => {
    const data = await findItemByIdService("productgroups", itemId);
    if (data) {
      const pg = data as ProductGroupType;
      setProductGroup(pg);
      setProduct(pg.product as ProductType);
      getOptions(Number(pg.id));
      ref.current.setValues({...ref.current.values,productId: pg.product?.id,productGroupId: pg.id})
    }
  };

  const getOptions = async (id: number) => {
    const data = await findOptionsByOptionGroupService("options", 0, id);
    if(data) {
      setOptions(data.itens)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getProductGroup();
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
      router.push(routePage + "/" + itemId);
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
      <HeadTag title={"Vincular opção ao grupo " + productGroup.name} />
      <Layout>
        <Box
          flex="1"
          borderRadius={8}
          bg={color.colorContainer}
          color={color.colorText}
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
          Vincular opção ao grupo {productGroup?.name}<br />
          <small>Opção para o produto {product?.name}</small>
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
                        error={errors.price} step="0.01" type="number"
                        onChange={handleChange("price")}
                        value={values.price}
                        onBlur={handleBlur("price")}
                      />
                      <Input
                        label="Estoque desse item"
                        error={errors.stock} step="0" type="number"
                        onChange={handleChange("stock")}
                        value={values.stock}
                        onBlur={handleBlur("stock")}
                      />
                    </SimpleGrid>
                  </VStack>
                  <Divider my="6" borderColor="gray.700" />
                  <Flex mt="8" justify="flex-end">
                    <HStack spacing="4">
                      <Link href={routePage + "/" + itemId} passHref>
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
                        Vincular
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
