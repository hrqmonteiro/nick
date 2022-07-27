import { UserType } from "../types/UserType";
import { drndecrypt } from "./crypt"

export const rolePermission = (allowedRole: string[] = [], hash: string = '') => {
    // Verifica se o usuário possui permissão para visualizar
    try {
        // Converte hash salvo no cookie em Usuário
        const user = drndecrypt(hash) as UserType;
        // Verifica a permissão do usuário e se está incluso no array de string
        if (user && user.role) {
            if (allowedRole.includes(user.role.slug)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
        return false
    }

}