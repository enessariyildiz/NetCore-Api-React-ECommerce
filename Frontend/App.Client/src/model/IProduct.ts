export interface IProduct {
    id: number,
    name: string,
    description?: string,
    price: number,
    isActive: boolean,
    ImageUrl?: string,
    stock?: number
}