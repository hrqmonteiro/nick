import { api } from "../api";

export const findItemByIdService = async (table: string, id: number) => {
    try {
        let item;
        const response = await api.get(table + '/byid/' + id)
        if(response.data.status === 'success') {
            item = response.data.content
        }
        return item
    } catch(err) {
        console.log(err);
        return null
    }
}