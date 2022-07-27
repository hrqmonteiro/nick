import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { StoreThemeType } from "../../../types/StoreThemeType";
import styles from "./styles/Featured.module.css";

export default function FeaturedTheme01({ store }: { store: StoreThemeType }) {
  const totalImages = Number(store.user?.banners?.length);
  const [index, setIndex] = useState(0);
  const [totalBanners, setTotalBanners] = useState(
    totalImages < 1 ? 0 : totalImages - 1
  );

  const handleArrow = (direction: any) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : totalBanners);
    }
    if (direction === "r") {
      setIndex(index !== totalBanners ? index + 1 : 0);
    }
  };
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: store.colorBackground }}
    >
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image src="/img/arrowl.png" alt="" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {store.user?.banners?.map((item) => (
          <div key={item.id} className={styles.imgContainer}>
            <Link href={"/" + store.slug + "/produto/" + item.productId}>
              <Image
                src={"/api/uploads/banners/" + item.path}
                alt=""
                objectFit="cover"
                w="100%"
              />
            </Link>
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image src="/img/arrowr.png" alt="" objectFit="contain" />
      </div>
    </div>
  );
}
