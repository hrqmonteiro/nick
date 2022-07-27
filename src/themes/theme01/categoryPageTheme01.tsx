import { ProductType } from "../../types/ProductType";
import { StoreThemeType } from "../../types/StoreThemeType";
import Head from "next/head";
import NavbarTheme01 from "./components/NavbarTheme01";
import FooterTheme01 from "./components/FooterTheme01";
import ProductTheme01 from "./components/ProductTheme01";
import { CategoryType } from "../../types/CategoryType";
import CategoryList from "./components/CategoryList";

export default function CategoryPageTheme01({
  store,
  category,
  products
}: {
  store: StoreThemeType;
  products: ProductType[];
  category: CategoryType;
}) {
  console.log(store, products, category)
  return (<div>
    <Head>
      <title>{category.name} | {store.name}</title>
      <div dangerouslySetInnerHTML={{ __html: String(store.head) }} />
    </Head>
    <NavbarTheme01 store={store} />
    <CategoryList store={store} products={products} />
    <FooterTheme01 store={store} />
  </div>);
}
