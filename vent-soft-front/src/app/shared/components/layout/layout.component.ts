import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Forzar detección de cambios después de la inicialización
  }
  
  get contentMargin() {
    return this.sidebar?.isSidebarOpen ? 'ml-72' : 'ml-16'; 
  }

  get isSidebarOpen() {
    return this.sidebar?.isSidebarOpen || false;
  }
}