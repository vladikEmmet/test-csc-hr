import axios from "axios";
import {IProduct, ProductWithoutId} from "../types/product.type";

const ProductService = {
    async getProductById(id: string): Promise<IProduct> {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        return response.data;
    },

    async getAllProducts(): Promise<IProduct[]> {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        return response.data;
    },

    async addProduct(product: ProductWithoutId) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, product);
        return response.data;
    },

    async updateProduct(product: IProduct): Promise<IProduct> {
        const {id, ...productWithoutId} = product;
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, productWithoutId);
        return response.data;
    },

    async deleteProduct(id: string) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
    }
};

export default ProductService;