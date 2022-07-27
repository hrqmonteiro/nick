import { OptionType } from "./OptionType";
import { UserType } from "./UserType";

export interface OptionGroupType {
    id?: number;
    name?: string;
    typeOption?: string;
    user?: UserType;
    userId?: number;
    options?: OptionType[];
    status?: number;
}