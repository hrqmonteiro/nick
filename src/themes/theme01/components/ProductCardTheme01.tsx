/* eslint-disable jsx-a11y/alt-text */
import styles from "./styles/ProductCard.module.css";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductCardTheme01({
  name,
  price,
  path,
  category,
  link,
}: {
  name: string;
  category: string;
  price: string;
  path: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className={styles.container}>
        <Center w="100%">
          <Image src={"/api/uploads/products/" + path} h="199px" />
        </Center>
        <small style={{ marginTop: "5px" }}>{category}</small>
        <h1 className={styles.title}>{name}</h1>
        <span className={styles.price}>R$ {price.replace(".", ",")}</span>
        <Flex h="100%" w="100%" justifyContent={"flex-end"} mb="-10px">
          <Box borderRadius={"10px"} mt="12px" w="100%" bg="#7E0508">
            <Center w="100%" p="5px">
              <Text fontSize={14}>Ver detalhes</Text>
            </Center>
          </Box>
        </Flex>
      </div>
    </Link>
  );
}
