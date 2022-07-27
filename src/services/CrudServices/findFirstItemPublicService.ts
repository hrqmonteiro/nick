import { api } from "../api";

export const findFirstItemPublicService = async (table: string) => {
    try {
        let item;
        const response = await api.get(table + '/public/first')
        if(response.data.status === 'success') {
            item = response.data.content
        }
        return item
    } catch(err) {
        console.log(err);
        return null
    }
}