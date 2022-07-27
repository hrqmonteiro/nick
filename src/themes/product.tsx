import { ProductType } from "../types/ProductType"
import { StoreThemeType } from "../types/StoreThemeType"
import ProductPageTheme01 from "./theme01/productPageTheme01"

interface FindThemeProps {
    store: StoreThemeType,
    product: ProductType
}

export default function ProductTheme({store, product}: FindThemeProps) {
    // Adicione aqui os temas disponíveis
    if(store.theme === 'theme01') {
        return <ProductPageTheme01 store={store} product={product} />
    } else {
        return <></>
    }
}