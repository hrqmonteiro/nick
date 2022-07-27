
import { api } from '../api';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { UserType } from '../../types/UserType';
import { namecookie } from '../../config/variables';

export const loginService = async (values: UserType) => {
    let newSession;
    try {
        const response = await api.post('auth/login', values);
        if (response.data.content) {
            newSession = response.data.content;
            setCookie(null, namecookie, response.data.content, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
        }
        return newSession;
    } catch (err) {
        console.log(err);
        return null;
    }
}