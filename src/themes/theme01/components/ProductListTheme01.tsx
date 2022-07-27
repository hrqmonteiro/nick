import { StoreThemeType } from "../../../types/StoreThemeType";
import ProductCardTheme01 from "./ProductCardTheme01";
import styles from "./styles/ProductList.module.css";

export default function ProductListTheme01({
  store,
}: {
  store: StoreThemeType;
}) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: store.colorBackground }}
    >
      <h1 className={styles.title}></h1>
      <p className={styles.desc}></p>
      <div className={styles.wrapper}>
        {store.user?.products &&
          store.user.products.map((item) => {
            return (
              <ProductCardTheme01
                category={String(item.category?.name)}
                key={item.id}
                link={"/" + store.slug + "/produto/" + item.id}
                name={String(item.name)}
                price={String(item.price)}
                path={String(item.path)}
              />
            );
          })}
      </div>
    </div>
  );
}
