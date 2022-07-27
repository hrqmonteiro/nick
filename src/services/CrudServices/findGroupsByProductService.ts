import { api } from "../api";

export const findGroupsByProductService = async (table: string, page: number, id: number) => {
    try {
        let data;
        const values = {
            page, id
        }
        const response = await api.post(table + '/byproduct', values);
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