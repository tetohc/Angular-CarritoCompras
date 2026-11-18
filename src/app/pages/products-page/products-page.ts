import { Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GetCategoryResponse } from '../../interfaces/category-dtos';
import { CartItem, GetProductResponse, ReturnProductRequest } from '../../interfaces/product-dtos';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  imports: [MatListModule, MatIconModule, ProductCardComponent],
  selector: 'app-products-page',
  styleUrl: './products-page.scss',
  templateUrl: './products-page.html',
})
export class ProductsPage {
  protected categories = signal<GetCategoryResponse[]>([]);
  protected products = signal<GetProductResponse[]>([]);

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private _snackBar = inject(MatSnackBar);

  protected categorySelected = signal<string>('0');

  constructor() {
    this.categoryService.getAll().subscribe({
      next: response => this.categories.set(response),
      error: (e) => console.log(e.error)
    });

    effect(() => {
      const request: ReturnProductRequest = {
        categoryId: this.categorySelected()
      }

      this.productService.getAll(request).subscribe({
        next: response => this.products.set(response),
        error: (e) => console.log(e.error)
      });
    });
  }

  protected onAddToCart(product: GetProductResponse): void {
    const item: CartItem = {
      productId: product.productId,
      name: product.name.trim(),
      price: product.price,
      image: product.imageUrl,
      quantity: 1
    }
    this.cartService.addToCart(item);
    this._snackBar.open('¡Agregado al carrito!', 'Aceptar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000
    });
  }
}
