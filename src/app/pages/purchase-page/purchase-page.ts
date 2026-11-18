import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order-service';
import { GetOrderResponse } from '../../interfaces/order-dtos';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [MatExpansionModule, MatIconModule, DecimalPipe],
  selector: 'app-purchase-page',
  styleUrl: './purchase-page.scss',
  templateUrl: './purchase-page.html',
})
export class PurchasePage {
  private orderService = inject(OrderService);
  protected orders = signal<GetOrderResponse[]>([]);

  constructor() {
    this.orderService.getAll().subscribe({
      next: response => this.orders.set(response),
      error: (e) => console.log(e.error)
    });
  }
}
