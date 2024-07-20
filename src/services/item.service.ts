import axios from "axios";
import {IItem, ItemWithoutId} from "../types/item.type";

const ItemService = {
    async getItemById(id: string): Promise<IItem> {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`);
        return response.data;
    },

    async getAllItems(): Promise<IItem[]> {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`);
        return response.data;
    },

    async addItem(product: ItemWithoutId) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/items`, product);
        return response.data;
    },

    async updateItem(product: IItem): Promise<IItem> {
        const {id, ...itemWithoutId} = product;
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, itemWithoutId);
        return response.data;
    },

    async deleteItem(id: string) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`);
    }
}

export default ItemService;