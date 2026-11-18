import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { GetCategoryResponse } from '../interfaces/category-dtos';

@Service()
export class CategoryService {
    private http = inject(HttpClient);
    private endpoint = `${environment.apiUrl}/categories`;

    getAll(): Observable<GetCategoryResponse[]> {
        return this.http.get<GetCategoryResponse[]>(this.endpoint);
    }
}
