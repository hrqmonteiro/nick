import { CategoryType } from "../types/CategoryType"
import { ProductType } from "../types/ProductType"
import { StoreThemeType } from "../types/StoreThemeType"
import CartPageTheme01 from "./theme01/cartPageTheme01"
import CategoryPageTheme01 from "./theme01/categoryPageTheme01"

interface FindThemeProps {
    store: StoreThemeType
}

export default function CartTheme({store}: FindThemeProps) {
    // Adicione aqui os temas disponíveis
    if(store.theme === 'theme01') {
        return <CartPageTheme01 store={store} />
    } else {
        return <></>
    }
}