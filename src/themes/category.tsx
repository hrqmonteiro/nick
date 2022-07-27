import { CategoryType } from "../types/CategoryType"
import { ProductType } from "../types/ProductType"
import { StoreThemeType } from "../types/StoreThemeType"
import CategoryPageTheme01 from "./theme01/categoryPageTheme01"

interface FindThemeProps {
    store: StoreThemeType,
    category: CategoryType,
    products: ProductType[]
}

export default function CategoryTheme({store, category,products}: FindThemeProps) {
    // Adicione aqui os temas disponíveis
    if(store.theme === 'theme01') {
        return <CategoryPageTheme01 store={store} category={category} products={products} />
    } else {
        return <></>
    }
}