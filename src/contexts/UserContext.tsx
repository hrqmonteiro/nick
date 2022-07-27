import { createContext, useEffect, useState } from "react";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { UserType } from "../types/UserType";
import { api } from "../services/api";
import { namecookie } from "../config/variables";
import { drndecrypt } from "../services/crypt";
import { getUserService } from "../services/AuthServices/getUserService";
import { findUserByCookieService } from "../services/AuthServices/findUserByCookieService";

type UserContextProps = {
  user: UserType;
};

type UserProviderProps = {
  children?: any;
};

const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({} as UserType);

  const getUser = async () => {
    try {
      const findUser = await findUserByCookieService();
      if (findUser && findUser.id) {
        // Atualiza o usuário
        const data = await getUserService(findUser.id);
        if (data) {
          setUser(data);
        } else {
          destroyCookie(null, namecookie);
        }
      } else {
      }
    } catch (err) {
      destroyCookie(null, namecookie);
    }
  };

  useEffect(() => {
    getUser()
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserContext;
