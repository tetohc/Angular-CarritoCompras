import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { form, required, FormField } from '@angular/forms/signals';
import { GetCategoryResponse } from '../../interfaces/category-dtos';
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { CreateProductRequest } from '../../interfaces/product-dtos';

@Component({
  imports: [MatIcon, MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormField],
  selector: 'app-new-product-page',
  styleUrl: './new-product-page.scss',
  templateUrl: './new-product-page.html',
})

export class NewProductPage {
  private initialData = {
    categoryId: '0',
    name: '',
    price: '',
    stockQuantity: '',
    image: null
  }

  private productModel = signal(this.initialData);
  protected productForm = form(this.productModel, (x) => {
    required(x.categoryId);
    required(x.name);
    required(x.price);
    required(x.stockQuantity);
  });

  protected selectedFile = signal<File | null>(null);
  protected categories = signal<GetCategoryResponse[]>([]);
  protected categoryService = inject(CategoryService);
  protected productService = inject(ProductService);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.categoryService.getAll().subscribe({
      next: response => this.categories.set(response),
      error: (e) => console.log(e.error)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0)
      this.selectedFile.set(input.files[0]);
  }

  createProduct(): void {
    const { categoryId, name, price, stockQuantity } = this.productForm().value();
    const request: CreateProductRequest = {
      categoryId: Number(categoryId),
      name,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      image: this?.selectedFile()!
    }

    this.productService.create(request).subscribe({
      next: response => {
        this._snackBar.open('¡El Producto ha sido creado exitosamente!', 'Aceptar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000
        });
        this.cleanForm();
      },
      error: (e) => console.log(e.error)
    });
  }

  cleanForm(): void {
    this.productModel.set(this.initialData);
    this.productForm().reset();
    this.selectedFile.set(null);
  }
}
