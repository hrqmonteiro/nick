import { parseCookies } from "nookies";
import { namecookie } from "../../config/variables";
import { UserType } from "../../types/UserType";
import { drndecrypt } from "../crypt";

export const findUserByCookieService = async (hash?: string) => {
  try {
    let user;
    if (hash) {
      user = drndecrypt(hash)
    } else {
      const cookies = parseCookies();
      const cookieValue = cookies[namecookie];
      if (cookieValue) {
        user = drndecrypt(cookieValue);
      }
    }

    return user as UserType;
  } catch (err) {
    return null;
  }
}