import { destroyCookie } from "nookies";
import { namecookie } from "../../config/variables";
import { api } from "../api";

export const getUserService = async (id: number) => {
    try {
        let item;
        const response = await api.get("users/byid/" + id);
        if(response.data.status === 'success') {
            item = response.data.content;
        }
        return item;
      } catch (err) {
        console.log(err);
        destroyCookie(null, namecookie);
        return null;
      }
}