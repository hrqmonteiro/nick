import StringCrypto from 'string-crypto';
import { secret } from '../config/variables';
import { UserType } from '../types/UserType';

const {
    encryptString,
    decryptString,
} = new StringCrypto();

export const drncrypt = (user: UserType) => {
    // Converte dados do usuário em hash. Para invalidar todos os antigos, mude o secret
    let token;
    let str = JSON.stringify(user);
    token = encryptString(str, secret);
    return token;
}

export const drndecrypt = (token: string) => {
    // Converte o hash em objeto/dados do Usuário. Para invalidar todos os antigos, mude o secret
    try {
        token = token.replace('%', ':');
        let str = decryptString(token, secret);
        const user = JSON.parse(str);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}