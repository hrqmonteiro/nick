import { OptionType } from "./OptionType";
import { ProductGroupType } from "./ProductGroupType";
import { ProductType } from "./ProductType";
import { UserType } from "./UserType";

export interface ProductOptionType {
    id?: number;
    name?: string;
    product?: ProductType;
    productId?: number;
    user?: UserType;
    userId?: number;
    productGroup?: ProductGroupType;
    productGroupId?: number;
    option?: OptionType;
    optionId?: number;
    stock?: number;
    price?: string;
    status?: number;
}