import { useEffect } from "react";
import { namestorage } from "../config/variables";
import { StoreThemeType } from "../types/StoreThemeType"
import Theme01 from "./theme01"
import { v4 as uuidv4 } from 'uuid';

interface FindThemeProps {
    store: StoreThemeType
}

export default function HomeTheme({store}: FindThemeProps) {
    // Adicione aqui os temas disponíveis
    useEffect(() => {
        const customer = localStorage.getItem(namestorage);
        if(customer) {
          console.log('Hash recuperado' + customer)
        } else {
          localStorage.setItem(namestorage, uuidv4());
        }
      }, [])
    if(store.theme === 'theme01') {
        return <Theme01 store={store} />
    } else {
        return <></>
    }
}