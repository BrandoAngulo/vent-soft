import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { InvoiceDTO } from '../invoices/invoice/invoice.dto';
import { InvoiceService } from '../invoices/services/invoice.service';
import { ProductDTO } from '../product/product.dto';
import { ProductService } from '../product/services/product.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent implements OnInit {
  dailySales: { date: string; amount: number }[] = [];
  monthlySales: { date: string; amount: number }[] = [];
  topProducts = new MatTableDataSource<any>([]);
  transactions: { inflows: number; outflows: number } = { inflows: 0, outflows: 0 };
  monthlyTotal: number = 0;

  productColumns: string[] = ['name', 'unitsSold', 'revenue']; // Sin 'category'

  private invoices: InvoiceDTO[] = [];
  private products: ProductDTO[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.invoiceService.list().subscribe({
      next: (invoices) => {
        console.log('Facturas recibidas:', invoices);
        this.invoices = invoices.filter((inv) => inv.status);
        console.log('Facturas activas:', this.invoices);
        this.processDailySales();
        this.processMonthlySales();
        this.processTopProducts();
        this.processTransactions();
      },
      error: (err) => console.error('Error cargando facturas:', err),
    });

    this.productService.list().subscribe({
      next: (products) => {
        console.log('Productos recibidos:', products);
        this.products = products;
        this.processTransactions(); // Llamar de nuevo tras cargar productos
      },
      error: (err) => console.error('Error cargando productos:', err),
    });
  }

  processDailySales() {
    const today = new Date().toISOString().split('T')[0];
    this.dailySales = this.invoices
      .filter((inv) => {
        const invDate = inv.date.split('T')[0];
        const matches = invDate === today;
        console.log(`Factura ${inv.id}: ${inv.date} -> Hoy ${matches ? 'Sí' : 'No'}`);
        return matches;
      })
      .map((inv) => ({ date: inv.date, amount: inv.total }));
    this.transactions.inflows = this.dailySales.reduce((sum, sale) => sum + sale.amount, 0);
    console.log('Ventas diarias:', this.dailySales);
    console.log('Ingresos diarios (inflows):', this.transactions.inflows);
  }

  processMonthlySales() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.monthlySales = this.invoices
      .filter((inv) => {
        const invDate = new Date(inv.date);
        const matches = invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
        console.log(`Factura ${inv.id}: ${inv.date} -> Mes ${matches ? 'Sí' : 'No'}`);
        return matches;
      })
      .map((inv) => ({ date: inv.date, amount: inv.total }));
    this.monthlyTotal = this.monthlySales.reduce((sum, sale) => sum + sale.amount, 0);
    console.log('Ventas mensuales:', this.monthlySales);
    console.log('Total mensual:', this.monthlyTotal);
  }

  processTopProducts() {
    const productSales: { [key: number]: { name: string; unitsSold: number; revenue: number } } = {};
    this.invoices.forEach((inv) => {
      inv.itemInvoices.forEach((item) => {
        const product = item.product;
        const amountSold = item.amountSold ?? 0;
        const price = item.product.price ?? 0;
        if (!productSales[product.id]) {
          productSales[product.id] = {
            name: product.name,
            unitsSold: 0,
            revenue: 0,
          };
        }
        productSales[product.id].unitsSold += amountSold;
        productSales[product.id].revenue += price * amountSold;
        console.log(`Producto ${product.id}: ${product.name} - Vendido: ${amountSold}, Precio: ${price}, Ingreso: ${price * amountSold}`);
      });
    });
    this.topProducts.data = Object.values(productSales)
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 10);
    console.log('Top productos:', this.topProducts.data);
  }

  processTransactions() {
    this.transactions.inflows = this.invoices.reduce((sum, inv) => sum + inv.total, 0);

    // Calcular salidas: valor de productos agregados en el mes actual usando product.date
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.transactions.outflows = this.products
      .filter((product) => {
        const productDate = new Date(product.date);
        const matches = productDate.getMonth() === currentMonth && productDate.getFullYear() === currentYear;
        console.log(`Producto ${product.id}: ${product.name} - Fecha: ${product.date} -> Mes ${matches ? 'Sí' : 'No'}`);
        return matches;
      })
      .reduce((sum, product) => {
        const price = product.price ?? 0;
        const stock = product.stock ?? 0; // Usar stock como cantidad agregada
        const value = price * stock;
        console.log(`Producto ${product.id}: ${product.name} - Precio: ${price}, Stock: ${stock}, Valor: ${value}`);
        return sum + value;
      }, 0);

    console.log('Transacciones - Inflows:', this.transactions.inflows);
    console.log('Transacciones - Outflows:', this.transactions.outflows);
  }
}
