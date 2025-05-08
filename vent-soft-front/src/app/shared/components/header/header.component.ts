import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../business/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import VentsoftLogoComponent from '../ventsoft-logo/ventsoft-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, VentsoftLogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}