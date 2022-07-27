import { ProductType } from "./ProductType";
import { UserType } from "./UserType";

export interface BannerType {
    id?: number;
    name?: string;
    path?: string;
    product?: ProductType;
    productId?: number;
    user?: UserType;
    userId?: number;
    status?: number;
}