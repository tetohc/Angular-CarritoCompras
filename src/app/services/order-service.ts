import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateOrderRequest, GetOrderResponse } from '../interfaces/order-dtos';
import { Observable } from 'rxjs';

@Service()
export class OrderService {
    private http = inject(HttpClient);
    private endpoint = `${environment.apiUrl}/orders`;

    create(request: CreateOrderRequest): Observable<number> {
        return this.http.post<number>(this.endpoint, request);
    }

    getAll(): Observable<GetOrderResponse[]> {
        return this.http.get<GetOrderResponse[]>(this.endpoint);
    }
}
