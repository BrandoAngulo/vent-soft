import { Routes } from '@angular/router';
import { AuthGuard } from './business/auth/auth.guard';

export const routes: Routes = [
  // Ruta de login (fuera del layout, no requiere autenticación)
  {
    path: 'login',
    loadComponent: () => import('./business/auth/login/login.component')
  },
  // Rutas protegidas dentro del layout
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    canActivate: [AuthGuard], // Proteger todas las rutas dentro del layout
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
        loadComponent: () => import('./business/customer/customer.component')
      },
      {
        path: 'city',
        loadComponent: () => import('./business/city/city.component')
      },
      {
        path: 'invoice',
        loadComponent: () => import('./business/invoices/invoice/invoice.component')
      },
      {
        path: 'product',
        loadComponent: () => import('./business/product/product.component')
      },
      {
        path: 'supplier',
        loadComponent: () => import('./business/supplier/supplier.component')
      },
      {
        path: 'user',
        loadComponent: () => import('./business/user/user.component')
        // No añadimos restricción de ROLE_USER, ya que es un módulo administrativo
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  // Redirigir a login si la ruta no existe
  {
    path: '**',
    redirectTo: 'login'
  }
];