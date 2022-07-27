import Head from "next/head";
import { StoreThemeType } from "../../types/StoreThemeType";
import FeaturedTheme01 from "./components/FeaturedTheme01";
import FooterTheme01 from "./components/FooterTheme01";
import NavbarTheme01 from "./components/NavbarTheme01";
import ProductListTheme01 from "./components/ProductListTheme01";

interface Theme01Props {
  store: StoreThemeType;
}

export default function Theme01({ store }: Theme01Props) {
  return (
    <div>
      <Head>
        <title>{store.name}</title>
        <div dangerouslySetInnerHTML={{ __html: String(store.head) }} />
      </Head>
      <NavbarTheme01 store={store} />
      <FeaturedTheme01 store={store} />
      <ProductListTheme01 store={store} />
      <FooterTheme01 store={store} />
    </div>
  );
}
