export interface Order {
    id: number
    orderDate: Date
    firstName: string
    lastName: string
    phone: string
    city: string
    addressLine: string
    customerId: string
    orderStatus: number
    orderItems: OrderItem[]
    subTotal: number
    deliveryFree: number
}

export interface OrderItem {
    id: number
    prodouctId: number
    productName: string
    productImage: string
    price: number
    quantity: number
}