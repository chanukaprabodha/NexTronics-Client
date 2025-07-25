export interface ProductData {
    id: number,
    name: string,
    price: number,
    currency: string,
    image: string,
    description: string,
    quantity: number,
    isWishlisted?: boolean
}