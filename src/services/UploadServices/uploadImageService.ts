import { api } from "../api";

export const uploadImageService = async (files: any,table: string) => {
    let filename;
    try {
        let file = new FormData();
        file.append("theFiles[]", files);
        const response = await api.post(table + "/upload", file);
        filename = response.data.name;
        return filename;
    } catch (err) {
        console.log(err);
        return null;
    }
}