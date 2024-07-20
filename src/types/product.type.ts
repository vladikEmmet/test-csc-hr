export type IProduct = {
    id: string;
    name: string;
    price: number;
}

export type ProductWithoutId = Omit<IProduct, 'id'>;