import { OptionGroupType } from "./OptionGroupType";

export interface OptionType {
    id?: number;
    name?: string;
    optionGroup?: OptionGroupType;
    optionGroupId?: number;
    status?: number;
}