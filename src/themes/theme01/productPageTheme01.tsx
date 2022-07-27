import { ProductType } from "../../types/ProductType";
import { StoreThemeType } from "../../types/StoreThemeType";
import Head from "next/head";
import NavbarTheme01 from "./components/NavbarTheme01";
import FooterTheme01 from "./components/FooterTheme01";
import ProductTheme01 from "./components/ProductTheme01";

export default function ProductPageTheme01({
  store,
  product,
}: {
  store: StoreThemeType;
  product: ProductType;
}) {
  return (<div>
    <Head>
      <title>{product.name} | {store.name}</title>
      <div dangerouslySetInnerHTML={{ __html: String(store.head) }} />
    </Head>
    <NavbarTheme01 store={store} />
    <ProductTheme01 store={store} product={product} />
    <FooterTheme01 store={store} />
  </div>);
}
