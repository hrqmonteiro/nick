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
import Layout from "../../../components/painel/Layout";
import { findUserByCookieService } from "../../../services/AuthServices/findUserByCookieService";
import { editItemService } from "../../../services/CrudServices/editItemService";
import { findFirstItemByUserService } from "../../../services/CrudServices/findFirstItemByUserService";
import { findItemByIdService } from "../../../services/CrudServices/findItemByIdService";
import useColorData from "../../../services/hooks/useColorData";
import { uploadImageService } from "../../../services/UploadServices/uploadImageService";
import { BannerType } from "../../../types/BannerType";
import { StoreThemeType } from "../../../types/StoreThemeType";
import { UserType } from "../../../types/UserType";

const itemSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  colorNavbar: yup.string().required("Faltou você preencher esse item"),
  colorBackground: yup.string().required("Faltou você preencher esse item"),
  colorDrawer: yup.string().required("Faltou você preencher esse item"),
  colorFooter: yup.string().required("Faltou você preencher esse item"),
  head: yup.string().required("Faltou você preencher esse item"),
  footer: yup.string().required("Faltou você preencher esse item"),
  address: yup.string().required("Faltou você preencher esse item"),
  schedule: yup.string().required("Faltou você preencher esse item"),
  path: yup.string().required("Faltou você preencher esse item"),
  slug: yup.string().matches(/^(\S+$)/g, 'Não pode ter espaços').matches(/^[ 0-9a-zA-Z\b]+$/g, 'Não pode ter caracteres especiais').min(3, 'Nome de usuário muito curto').max(20, 'Nome de usuário muito longo').required('Você não informou o username').lowercase('Somente letras minúsculas'),
});

const typeItem = "Configurações da loja";
const routePage = "/painel/loja";
const table = "storethemes";

const initialValues = {
  name: "",
  colorNavbar: "",
  colorBackground: "",
  colorDrawer: "",
  colorFooter: "",
  head: "",
  footer: "",
  address: "",
  schedule: "",
  path: "",
  slug: "",
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
      const data = await findFirstItemByUserService(table);
      if (data) {
        const item = data as StoreThemeType;
        ref.current.setValues({
          ...ref.current.values,
          name: item.name,
          colorNavbar: item.colorNavbar,
          colorBackground: item.colorBackground,
          colorDrawer: item.colorDrawer,
          colorFooter: item.colorFooter,
          head: item.head,
          footer: item.footer,
          address: item.address,
          schedule: item.schedule,
          path: item.path,
          slug: item.slug,
          id: item.id,
        });
      }
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const editItem = async (values: StoreThemeType) => {
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
                        label="Nome da loja"
                        error={errors.name}
                        onChange={handleChange("name")}
                        value={values.name}
                        onBlur={handleBlur("name")}
                      />
                      <Input
                        label="Slug da Loja"
                        error={errors.slug}
                        onChange={handleChange("slug")}
                        value={values.slug}
                        onBlur={handleBlur("slug")}
                      />
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Cor da Navbar" type="color"
                        error={errors.colorNavbar}
                        onChange={handleChange("colorNavbar")}
                        value={values.colorNavbar}
                        onBlur={handleBlur("colorNavbar")}
                      />
                      <Input
                        label="Cor de fundo" type="color"
                        error={errors.colorBackground}
                        onChange={handleChange("colorBackground")}
                        value={values.colorBackground}
                        onBlur={handleBlur("colorBackground")}
                      />
                      <Input
                        label="Cor do Drawer" type="color"
                        error={errors.colorDrawer}
                        onChange={handleChange("colorDrawer")}
                        value={values.colorDrawer}
                        onBlur={handleBlur("colorDrawer")}
                      />
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Cor do rodapé" type="color"
                        error={errors.colorFooter}
                        onChange={handleChange("colorFooter")}
                        value={values.colorFooter}
                        onBlur={handleBlur("colorFooter")}
                      />
                      <Input
                        label="Horários de funcionamento"
                        error={errors.schedule}
                        onChange={handleChange("schedule")}
                        value={values.schedule}
                        onBlur={handleBlur("schedule")}
                      />
                      <Input
                        label="Endereço"
                        error={errors.address}
                        onChange={handleChange("address")}
                        value={values.address}
                        onBlur={handleBlur("address")}
                      />
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Códigos HEAD (Google, Facebook, etc)"
                        error={errors.head}
                        onChange={handleChange("head")}
                        value={values.head}
                        onBlur={handleBlur("head")}
                      />
                    </SimpleGrid>
                    <SimpleGrid
                      minChildWidth="240px"
                      spacing={["6", "8"]}
                      w="100%"
                    >
                      <Input
                        label="Texto de Rodapé"
                        error={errors.footer}
                        onChange={handleChange("footer")}
                        value={values.footer}
                        onBlur={handleBlur("footer")}
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
                        src={"/api/uploads/stores/" + values.path}
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
                      </Text></Flex>) : (<Input label="Imagem do produto"
                        name="Imagem do produto"
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
