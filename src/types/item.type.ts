export type IItem = {
    id: string;
    name: string;
    description: string;
}

export type ItemWithoutId = Omit<IItem, 'id'>;