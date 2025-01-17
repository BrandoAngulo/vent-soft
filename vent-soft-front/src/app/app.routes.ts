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
        path: 'customer',
        loadComponent: () => import('./business/customer/customer.component'),
      },
      {
        path: 'city',
        loadComponent: () => import('./business/city/city.component')
      },
      {
        path: 'product',
        loadComponent: () => import('./business/product/product.component'),
      },
      {
        path: 'category',
        loadComponent: () => import('./business/category/category.component')
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
