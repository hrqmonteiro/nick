import { api } from "../api";

export const findItemsByCategoryIdPublicService = async (table: string,categoryId: number, page: number) => {
    try {
        let data;
        const json = {
            page, categoryId
        }
        const response = await api.post(table + '/public/bycategory', json);
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