import { api } from "../api"

export const editItemService = async (values: any, table: string) => {
    try {
        let item;
        const response = await api.post(table + '/edit', values);
        if (response.data.status === 'success') {
            item = response.data.content;
        }
        return item;
    } catch (err) {
        console.log(err)
        return null;
    }
}