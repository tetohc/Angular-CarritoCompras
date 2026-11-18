import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { OrderService } from '../../services/order-service';
import { CreateOrderRequest } from '../../interfaces/order-dtos';
import Swal from 'sweetalert2';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [MatIconModule, MatCardModule, MatDividerModule, RouterLink, DecimalPipe],
  selector: 'app-cart-page',
  styleUrl: './cart-page.scss',
  templateUrl: './cart-page.html',
})
export class CartPage {
  protected cartService = inject(CartService);
  private orderService = inject(OrderService);
  private readonly IVA = 1.13;

  protected total = computed<number>(() => {
    return this.cartService.getItems().reduce(
      (result, item) => result + (item.price * item.quantity), 0
    );
  });

  protected subtotal = computed(() => Number(this.total()) / this.IVA);
  protected taxes = computed(() => Number(this.total()) - this.subtotal());

  protected increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  protected decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  protected removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  protected finishPurchase(): void {
    const request: CreateOrderRequest = {
      totalAmount: Number(this.total()),
      details: this.cartService.getItems().map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    }
    this.orderService.create(request).subscribe({
      next: response => {
        Swal.fire({
          title: "¡Compra exitosa!",
          text: `Número de orden: ${response}`,
          icon: "success",
        });
        this.cartService.cleanItems();
      },
      error: (e) => console.log(e.error)
    });
  }
}
