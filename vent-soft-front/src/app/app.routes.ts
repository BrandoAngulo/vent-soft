import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component')
      },
      {
        path: 'category',
        loadComponent: () => import('./business/category/category.component')
      },
      {
        path: 'customer',
        loadComponent: () => import('./business/customer/customer.component'),
      },
      {
        path: 'city',
        loadComponent: () => import('./business/city/city.component')
      },
      {
        path: 'invoice',
        loadComponent: () => import('./business/invoices/invoice/invoice.component'),
      },
      {
        path: 'product',
        loadComponent: () => import('./business/product/product.component'),
      },
      {
        path: 'supplier',
        loadComponent: () => import('./business/supplier/supplier.component'),
      },
      {
        path: 'user',
        loadComponent: () => import('./business/user/user.component')
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
