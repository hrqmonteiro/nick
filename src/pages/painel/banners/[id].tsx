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
  import { createItemService } from "../../../services/CrudServices/createItemService";
import { editItemService } from "../../../services/CrudServices/editItemService";
import { findItemByIdService } from "../../../services/CrudServices/findItemByIdService";
  import { findItemsByUserService } from "../../../services/CrudServices/findItemsByUserService";
  import useColorData from "../../../services/hooks/useColorData";
  import { uploadImageService } from "../../../services/UploadServices/uploadImageService";
  import { BannerType } from "../../../types/BannerType";
  import { OptionGroupType } from "../../../types/OptionGroupType";
  import { ProductType } from "../../../types/ProductType";
  
  const itemSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    path: yup.string().required("Você não escolheu a imagem"),
    productId: yup
      .number()
      .positive("Você não escolheu o produto")
      .required("Você não escolheu o produto"),
      id: yup
      .number()
      .positive("Não foi possível encontrar o id")
      .required("Não foi possível encontrar o id"),
  });
  
  const typeItem = "Banner";
  const routePage = "/painel/banners";
  const table = "banners";
  
  const initialValues = {
    name: "",
    path: "",
    productId: -1,
    id: -1
  };
  
  export default function EditItem() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([] as ProductType[]);
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
  
    const getProducts = async () => {
      const data = await findItemsByUserService('products', 0);
      if (data) {
        console.log(data)
        setProducts(data.itens);
      }
    };

    const getItem = async () => {
        const data = await findItemByIdService(table, Number(itemId))
        if(data) {
            const item = data as BannerType;
            ref.current.setValues({...ref.current.values,name: item.name,path: item.path,productId: item.productId,id: item.id})
        }

    }
  
    useEffect(() => {
      getProducts();
      getItem();
    }, []);
  
    const createItem = async (values: BannerType) => {
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
  
    const uploadImage = async (event?: any) => {
      setLoading(true);
      const filename = await uploadImageService(event.target.files[0], table);
      if (String(filename).length > 20) {
        setLoading(false);
        ref.current.setValues({ ...ref.current.values, path: filename });
      } else {
        setLoading(false);
        toast({
          title: "Imagem muito grande",
          description: "Envie imagem de até 5MB !",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
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
                          label="Nome do Banner"
                          error={errors.name}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        />
                        <Select
                          label="Produto"
                          error={errors.productId}
                          data={products}
                          onChange={handleChange("productId")}
                          value={values.productId}
                          onBlur={handleBlur("productId")}
                        />
                      </SimpleGrid>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
                        {values.path && values.path.length > 20 ? (<Flex><Image
                          borderWidth={2}
                          borderStyle="solid"
                          ml="10px"
                          mr="10px"
                          borderColor={color.colorBackground}
                          src={"/api/uploads/banners/" + values.path}
                          h="100px"
                        />
                        <Text
                          onClick={() => setValues({ ...values, path: "" })}
                          cursor={"pointer"}
                          bg="red" h="35px"
                          color="#fff"
                          p="3px 10px 3px 10px"
                          borderRadius="md"
                        >
                          x
                        </Text></Flex>) : (<Input label="Imagem do banner"
                          name="Imagem do banner"
                          error={errors.path}
                          onChange={uploadImage}
                          accept=".jpeg,.png,.jpg,image/*"
                          type="file"
                          p="20px"
                          h="80px"
                        />)}
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
  