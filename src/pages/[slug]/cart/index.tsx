/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { findItemBySlugPublicService } from "../../../services/CrudServices/findItemBySlugPublicService";
import CartTheme from "../../../themes/cart";
import { StoreThemeType } from "../../../types/StoreThemeType";

export default function Loja({ slugItem }: { slugItem: string }) {
  const [store, setStore] = useState({} as StoreThemeType);

  const getStore = async () => {
    const data = await findItemBySlugPublicService("storethemes", slugItem);
    if (data) {
      setStore(data);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  if (store && store.id) {
    return <CartTheme store={store} />;
  } else {
    <Text></Text>;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugItem = context.query.slug;
  return {
    props: {
      slugItem,
    },
  };
};
