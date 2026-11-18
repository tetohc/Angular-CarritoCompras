import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProductsPage } from './pages/products-page/products-page';
import { CartPage } from './pages/cart-page/cart-page';
import { PurchasePage } from './pages/purchase-page/purchase-page';
import { NewProductPage } from './pages/new-product-page/new-product-page';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ProductsPage },
            { path: 'cart', component: CartPage },
            { path: 'purchase', component: PurchasePage },
            { path: 'newproduct', component: NewProductPage },
        ]
    }
];
