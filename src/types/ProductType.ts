import {CategoryType} from "./CategoryType";
import { ProductGroupType } from "./ProductGroupType";
import {UserType} from "./UserType";

export interface ProductType {
    id?: number;
    name?: string;
    slug?: string;
    price?: string;
    description?: string;
    path?: string;
    category?: CategoryType;
    categoryId?: number;
    user?: UserType;
    userId?: number;
    //   banners       banner[]
    productGroups?: ProductGroupType[];
    status?: number;
}