import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
