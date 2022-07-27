import { api } from "../api"

export const disableItemService = async (table: string, id: number) => {
    try {
        let item;
        const values = {
            id
        };
        const response = await api.post(table + '/disable', values);
        if (response.data.status === 'success') {
            item = true;
        }
        return item;
    } catch (err) {
        console.log(err)
        return null;
    }
}