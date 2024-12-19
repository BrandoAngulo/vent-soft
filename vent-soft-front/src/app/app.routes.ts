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
        path: 'profile',
        loadComponent: () => import('./business/profile/profile.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./business/tables/tables.component')
      },
      {
        path: 'product',
        loadComponent: () => import('./business/product/product.component')
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
