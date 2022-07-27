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
  import HeadTag from "../../../../../components/global/Head";
  import { Input } from "../../../../../components/painel/Forms/Input";
  import { Select } from "../../../../../components/painel/Forms/Select";
  import Layout from "../../../../../components/painel/Layout";
import { clothingSizeSelect } from "../../../../../data/clothingSizeSelect";
  import { optionGroupSelect } from "../../../../../data/optionGroupSelect";
import { shoeSizeSelect } from "../../../../../data/shoeSizeSelect";
  import { createItemService } from "../../../../../services/CrudServices/createItemService";
import { findItemByIdService } from "../../../../../services/CrudServices/findItemByIdService";
  import useColorData from "../../../../../services/hooks/useColorData";
import { OptionGroupType } from "../../../../../types/OptionGroupType";
import { OptionType } from "../../../../../types/OptionType";
  
  const itemSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    optionGroupId: yup.number().required("Você não selecionou o grupo"),
  });
  
  const typeItem = "Opção";
  const routePage = "/painel/grupodeopcoes";
  const table = "options";
  
  const initialValues = {
    name: "",
    optionGroupId: 0,
  };
  
  export default function CreateItem() {
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState({} as OptionGroupType);
    const router = useRouter();
    const itemId = Number(router.query.id);
    const { color } = useColorData();
    const toast = useToast();
    const ref = useRef<any>();

    const getGroup = async () => {
        const data = await findItemByIdService('optiongroups', itemId);
        if(data) {
            setGroup(data as OptionGroupType)
            ref.current.setValues({
                ...ref.current.values,
                optionGroupId: data.id
            })
        }
    }
  
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

    useEffect(() => {
        if(router.query.id) {
            getGroup();
        }
    }, [router.query.id]);
  
    const createItem = async (values: OptionType) => {
      setLoading(true);
      const response = await createItemService(values, table);
      if (response) {
        setLoading(false);
        router.push(routePage + '/opcoes/' + itemId);
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
              Criar {typeItem} em {group.name}
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
                        {/* <Input
                          label="Nome da Opção"
                          error={errors.name}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        /> */}
                        {group.typeOption === "clothingsize" && (<Select
                          label="Tamanho da roupa disponível"
                          error={errors.name}
                          data={clothingSizeSelect}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        />)}
                        {group.typeOption === "color" && (<Input
                          label="Selecione a cor disponível" type="color"
                          error={errors.name}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        />)}
                        {group.typeOption === "shoesize" && (<Select
                          label="Tamanho de calçado disponível"
                          error={errors.name}
                          data={shoeSizeSelect}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        />)}
                        {group.typeOption === "additional" && (<Input
                          label="Adicional disponível"
                          error={errors.name}
                          onChange={handleChange("name")}
                          value={values.name}
                          onBlur={handleBlur("name")}
                        />)}
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
  