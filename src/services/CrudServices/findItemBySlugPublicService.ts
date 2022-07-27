import { api } from "../api";

export const findItemBySlugPublicService = async (table: string,slug: string) => {
    try {
        let item;
        const response = await api.get(table + '/public/' + slug)
        if(response.data.status === 'success') {
            item = response.data.content
        }
        return item
    } catch(err) {
        console.log(err);
        return null
    }
}