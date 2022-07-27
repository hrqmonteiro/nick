/* eslint-disable react-hooks/rules-of-hooks */

import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { findItemBySlugAndIdPublicService } from "../../services/CrudServices/findItemBySlugAndIdPublicService";
import { findItemBySlugPublicService } from "../../services/CrudServices/findItemBySlugPublicService";
import { findItemsByCategoryIdPublicService } from "../../services/CrudServices/findItemsByCategoryIdPublicService";
import CategoryTheme from "../../themes/category";
import { CategoryType } from "../../types/CategoryType";
import { ProductType } from "../../types/ProductType";
import { StoreThemeType } from "../../types/StoreThemeType";

export default function findCategory({ slugItem,categoryItem }: { slugItem: string,categoryItem: string }) {
  const [category, setCategory] = useState({} as CategoryType);
  const [store, setStore] = useState({} as StoreThemeType);
  const [products, setProducts] = useState([] as ProductType[]);

  const getStore = async () => {
    const data = await findItemBySlugPublicService('storethemes', slugItem);
    if(data) {
      setStore(data)
      getCategory(data.userId)
    }
  }

  const getProducts = async (id: number) => {
    const data = await findItemsByCategoryIdPublicService('products', id, 0);
    if(data) {
      setProducts(data.itens)
    }
  }

  const getCategory = async (id: number) => {
    const data = await findItemBySlugAndIdPublicService('categories', String(categoryItem), id);
    if(data) {
      setCategory(data)
      getProducts(data.id)
    }
  }

  useEffect(() => {
    getStore();
  }, [])


  if(store && category && (store.userId === category.userId)) {
    return <CategoryTheme store={store} category={category} products={products} />;
  } else {
    <Text></Text>;
  }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugItem = context.query.slug;
  const categoryItem = context.query.category;
  return {
    props: {
      slugItem,
      categoryItem
    },
  };
};
