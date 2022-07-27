import { OptionGroupType } from "./OptionGroupType";
import { ProductOptionType } from "./ProductOptionType";
import { ProductType } from "./ProductType";

export interface ProductGroupType {
    id?: number;
    name?: string;
    product?: ProductType;
    productId?: number;
    optionGroup?: OptionGroupType;
    optionGroupId?: number;
    productOptions?: ProductOptionType[];
    status?: number;
}