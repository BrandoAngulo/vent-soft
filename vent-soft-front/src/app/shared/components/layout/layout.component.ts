import { Component, ViewChild } from '@angular/core';
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
  get contentMargin() {
    return this.sidebar?.isSidebarOpen ? 'ml-72' : 'ml-0';
  }
}
