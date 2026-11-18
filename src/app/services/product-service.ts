import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateProductRequest, GetProductResponse, ReturnProductRequest } from '../interfaces/product-dtos';
import { Observable } from 'rxjs';

@Service()
export class ProductService {
    private http = inject(HttpClient);
    private endpoint = `${environment.apiUrl}/products`;

    create(request: CreateProductRequest): Observable<number> {
        const formData = new FormData();
        formData.append("categoryId", request.categoryId.toString());
        formData.append("name", request.name);
        formData.append("price", request.price.toString());
        formData.append("stockQuantity", request.stockQuantity.toString());

        if (request.image)
            formData.append("image", request.image);

        return this.http.post<number>(this.endpoint, formData);
    }

    getAll(request: ReturnProductRequest): Observable<GetProductResponse[]> {
        return this.http.get<GetProductResponse[]>(`${this.endpoint}?categoryId=${request.categoryId}`);
    }
}
