import { BannerType } from "./BannerType";
import { CategoryType } from "./CategoryType";
import { ProductType } from "./ProductType";
import { RoleType } from "./RoleType";

export interface UserType {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    path?: string;
    roleId?: number;
    role?: RoleType;
    categories?: CategoryType[];
    banners?: BannerType[];
    products?: ProductType[];
}