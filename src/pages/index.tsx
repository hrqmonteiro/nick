import { useEffect, useState } from "react";
import { findFirstItemPublicService } from "../services/CrudServices/findFirstItemPublicService";
import HomeTheme from "../themes";
import { StoreThemeType } from "../types/StoreThemeType";

export default function IndexPage() {
  const [store, setStore] = useState({} as StoreThemeType);
  const getItem = async () => {
    const data = await findFirstItemPublicService("storethemes");
    if (data) {
      setStore(data);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  if (store && store.type === "store") {
    return <HomeTheme store={store} />;
  } else {
    return <></>;
  }
}
