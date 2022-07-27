/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { findItemByIdPublicService } from "../../../services/CrudServices/findItemByIdPublicService";
import { findItemBySlugPublicService } from "../../../services/CrudServices/findItemBySlugPublicService";
import ProductTheme from "../../../themes/product";
import { ProductType } from "../../../types/ProductType";
import { StoreThemeType } from "../../../types/StoreThemeType";

export default function findProduct({ slugItem, idItem }: { slugItem: string, idItem: string }) {
  const [product, setProduct] = useState({} as ProductType);
  const [store, setStore] = useState({} as StoreThemeType);

  const getProduct = async () => {
    const data = await findItemByIdPublicService('products', Number(idItem));
    if(data) {
      setProduct(data)
    }
  }

  const getStore = async () => {
    const data = await findItemBySlugPublicService('storethemes', slugItem);
    if(data) {
      setStore(data)
    }
  }

  useEffect(() => {
    getStore();
    getProduct();
  }, [])

  if(store && product && (store.userId === product.userId)) {
    return <ProductTheme store={store} product={product} />;
  } else {
    <Text></Text>;
  }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugItem = context.query.slug;
  const idItem = context.query.id;
  return {
    props: {
      slugItem,
      idItem
    },
  };
};
