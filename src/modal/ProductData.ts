export interface ProductData {
    id: string,
    name: string,
    price: number,
    currency: string,
    image: string,
    description: string,
    quantity: number,
    isWishlisted?: boolean
}