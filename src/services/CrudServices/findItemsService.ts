import { api } from "../api";

export const findItemsService = async (table: string, page: number) => {
    try {
        let data;
        const response = await api.get(table + '/page/' + page);
        if (response.data.status === 'success') {
            data = {
                itens: response.data.content,
                total: response.data.count
            };
        }
        return data;
    } catch (err) {
        console.log(err)
        return null;
    }
}