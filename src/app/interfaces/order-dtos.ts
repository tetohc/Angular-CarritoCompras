export interface CreateOrderRequest {
    totalAmount: number;
    details: OrderDetailRequest[];
}

export interface OrderDetailRequest {
    productId: number;
    quantity: number;
    unitPrice: number;
}

export interface GetOrderResponse {
    orderId: number;
    date: string;
    totalAmount: number;
    details: OrderDetailResponse[];
}

export interface OrderDetailResponse {
    imageUrl: string;
    productName: string;
    quantity: number;
    total: number;
}