/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import HeadTag from "../../../components/global/Head";
  import Layout from "../../../components/painel/Layout";
  import { IoMdRefresh } from "react-icons/io";
  import Link from "next/link";
  import { RiAddLine, RiPencilLine } from "react-icons/ri";
  import { BsTrash } from "react-icons/bs";
  import { Pagination } from "../../../components/painel/Pagination";
  import { CategoryType } from "../../../types/CategoryType";
  import useColorData from "../../../services/hooks/useColorData";
  import { findItemsByUserService } from "../../../services/CrudServices/findItemsByUserService";
  import { disableItemService } from "../../../services/CrudServices/disableItemService";
  import { OptionGroupType } from "../../../types/OptionGroupType";
import { BannerType } from "../../../types/BannerType";
  
  export default function ListItem() {
    const { color } = useColorData();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([] as BannerType[]);
    const [total, setTotal] = useState(0);
    const typeItem = "Banners";
    const routePage = "/painel/banners";
    const table = "banners";
  
    const getItens = async () => {
      setLoading(true);
      const data = await findItemsByUserService(table, page);
      if (data) {
        setTotal(data.total);
        setItems(data.itens);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getItens();
    }, []);
  
    const disableItem = async (id: number) => {
      const data = await disableItemService(table, id);
      if (data) {
        getItens();
      }
    };
  
    return (
      <div>
        <HeadTag title={typeItem} />
        <Layout>
          <Box flex="1" borderRadius={8} bg={color.colorContainer} p="8">
            <Flex mb="8" justify="start" align="center">
              <Heading size="lg" fontWeight="normal">
                {typeItem}
              </Heading>
              <Button
                onClick={() => getItens()}
                isLoading={loading}
                size="sm"
                fontSize="sm"
                marginLeft="auto"
                marginRight="2"
                bg={color.colorButton}
                color={color.colorText}
                colorScheme="blackAlpha"
                leftIcon={
                  <Icon
                    as={IoMdRefresh}
                    fontSize="20"
                    position="absolute"
                    inset="0"
                    m="auto"
                  />
                }
              ></Button>
              <Link href={routePage + "/create"} passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blackAlpha"
                  bg={color.colorButton}
                  color={color.colorText}
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>
            {loading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : items.length < 1 ? (
              <Flex justify="center">
                <Text>Nenhum item encontrado</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th w="8">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items?.map((item) => {
                      console.log(item)
                      return (
                        <Tr key={item.id}>
                          <Td>
                            <Text fontWeight="bold">{item.name}</Text>
                          </Td>
                          
                          <Td>
                            <ButtonGroup
                              size="sm"
                              borderColor={color.colorText}
                              color={color.colorButton}
                              isAttached
                              variant="outline"
                            >
                              <Link href={routePage + "/" + item.id}>
                                <IconButton
                                  aria-label="Editar"
                                  icon={<RiPencilLine />}
                                  as="a"
                                />
                              </Link>
                              <IconButton
                                onClick={() => disableItem(Number(item.id))}
                                aria-label="Deletar"
                                icon={<BsTrash />}
                                as="a"
                              />
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                <Pagination
                  totalCountOfRegisters={total}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Layout>
      </div>
    );
  }
  