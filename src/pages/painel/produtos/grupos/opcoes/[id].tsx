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
import HeadTag from "../../../../../components/global/Head";
import Layout from "../../../../../components/painel/Layout";
import { IoMdRefresh } from "react-icons/io";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import { Pagination } from "../../../../../components/painel/Pagination";
import useColorData from "../../../../../services/hooks/useColorData";
import { disableItemService } from "../../../../../services/CrudServices/disableItemService";
import { useRouter } from "next/router";
import { findItemByIdService } from "../../../../../services/CrudServices/findItemByIdService";
import { ProductType } from "../../../../../types/ProductType";
import { ProductOptionType } from "../../../../../types/ProductOptionType";
import { ProductGroupType } from "../../../../../types/ProductGroupType";
import { findOptionsByProductGroupService } from "../../../../../services/CrudServices/findOptionsByProductGroupService";

export default function ListItems() {
  const { color } = useColorData();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as ProductOptionType[]);
  const [productGroup, setProductGroup] = useState({} as ProductGroupType);
  const [product, setProduct] = useState({} as ProductType);
  const [total, setTotal] = useState(0);
  const router = useRouter();
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
    }
  };

  const getItens = async () => {
    setLoading(true);
    const data = await findOptionsByProductGroupService(table, page, itemId);
    if (data) {
      setTotal(data.total);
      setItems(data.itens);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getItens();
      getProductGroup();
    }
  }, [router.query.id]);

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
              {typeItem} {productGroup.name}<br />
          <small>Opções do produto {product?.name}</small>
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
            <Link href={routePage + "/create/" + itemId} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blackAlpha"
                bg={color.colorButton}
                color={color.colorText}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Vincular
              </Button>
            </Link>
          </Flex>
          {loading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : items.length < 1 ? (
            <Flex justify="center">
              <Text>Nenhuma opção encontrada</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Opção</Th>
                    <Th>Estoque</Th>
                    <Th w="8">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {items?.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>
                          <Text fontWeight="bold">{item.name}</Text>
                        </Td>
                        <Td>
                          <Text fontWeight="bold">
                            {item.stock} disponíveis
                          </Text>
                        </Td>
                        <Td>
                          <ButtonGroup
                            size="sm"
                            borderColor={color.colorText}
                            color={color.colorButton}
                            isAttached
                            variant="outline"
                          >
                            <Link href={routePage + "/edit/" + item.id}>
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
