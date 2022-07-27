import { UserType } from "./UserType";

export interface ColorType {
    id: number;
    colorBackground: string;
    colorContainer: string;
    colorText: string;
    colorButton: string;
    status: number;
    userId: number;
    user: UserType;
}
