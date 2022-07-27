import { api } from "../api";

export const findItemByIdPublicService = async (table: string,id: number) => {
    try {
        let item;
        const response = await api.get(table + '/public/' + id)
        if(response.data.status === 'success') {
            item = response.data.content
        }
        return item
    } catch(err) {
        console.log(err);
        return null
    }
}