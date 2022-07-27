import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { StoreThemeType } from "../../../types/StoreThemeType";
import styles from "./styles/Navbar.module.css";

export default function NavbarTheme01({ store }: { store: StoreThemeType }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: store.colorNavbar }}
    >
      <div className={styles.item}>
        <div className={styles.texts}>
          <div className={styles.text}>
            <Link href={"/" + store.slug}>{store.name}</Link>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href={"/" + store.slug}>Home</Link>
          </li>

          {store.user?.categories &&
            store.user.categories.map((item) => {
              return (
                <li key={item.id} className={styles.listItem}>
                  <Link href={"/" + store.slug + "/" + item.slug}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className={styles.item}>
        <Link href={"/" + store.slug + "/cart"}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          </div>
        </Link>
      </div>
    </div>
  );
}
