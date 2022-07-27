import { api } from "../api"

export const addOrderService = async (values: any, table: string) => {
    try {
        let item;
        const response = await api.post(table + '/create', values);
        if (response.data.status === 'success') {
            item = response.data.content;
        }
        return item;
    } catch (err) {
        console.log(err)
        return null;
    }
}