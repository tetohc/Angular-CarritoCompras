import { computed, Service, signal } from '@angular/core';
import { CartItem } from '../interfaces/product-dtos';

@Service()
export class CartService {
    private cartItems = signal<CartItem[]>([]);
    readonly totalItems = computed(() =>
        this.cartItems().reduce((total, item) => total + item.quantity, 0)
    );
    readonly getItems = this.cartItems.asReadonly();

    addToCart(product: CartItem): void {
        this.cartItems.update((items) => {
            const existingProduct = this.cartItems().find((x) => x.productId == product.productId);
            if (existingProduct) {
                return this.cartItems().map((item) =>
                    item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...items, product];
        });
    }

    increaseQuantity(productId: number): void {
        this.cartItems.update(items =>
            items.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
        );
    }

    decreaseQuantity(productId: number): void {
        this.cartItems.update(items =>
            items.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0)
        );
    }

    removeItem(productId: number): void {
        this.cartItems.update(items =>
            items.filter(item => item.productId !== productId)
        );
    }

    cleanItems(): void {
        this.cartItems.set([]);
    }
}
