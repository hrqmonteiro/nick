import { UserType } from "./UserType";

export interface StoreThemeType {
    id?: number;
    name?: string;
    theme?: string;
    colorNavbar?: string;
    colorBackground?: string;
    colorDrawer?: string;
    colorFooter?: string;
    head?: string;
    footer?: string;
    address?: string;
    schedule?: string;
    path?: string;
    slug?: string;
    status?: number;
    type?: string;
    user?: UserType;
    userId?: number;
}