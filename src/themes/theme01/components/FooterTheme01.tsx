import { StoreThemeType } from "../../../types/StoreThemeType";
import styles from "./styles/Footer.module.css";

export default function FooterTheme01({ store }: { store: StoreThemeType }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: store.colorFooter }}
    >
      <div className={styles.item}>
        <div className={styles.card}>
          <h2
            className={styles.motto}
            dangerouslySetInnerHTML={{ __html: String(store.footer) }}
          ></h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>NOSSO ENDEREÇO</h1>

          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: String(store.address) }}
          ></p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>HORÁRIO DE ATENDIMENTO</h1>
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: String(store.schedule) }}
          ></p>
        </div>
      </div>
    </div>
  );
}
