import { api } from "../api";

export const findItemBySlugAndIdPublicService = async (table: string,slug: string, userId: number) => {
    try {
        let item;
        const json = {
            slug, userId
        }
        const response = await api.post(table + '/public/byslug', json)
        if(response.data.status === 'success') {
            item = response.data.content
        }
        return item
    } catch(err) {
        console.log(err);
        return null
    }
}