import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../business/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = true;
  hoverTimeout: any;
  login$: Observable<string | null> | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.login$ = this.authService.getLogin();
    setTimeout(() => {
      this.isSidebarOpen = false;
    }, 500);
  }

  onMouseEnter() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      this.isSidebarOpen = true;
    }, 100);
  }

  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      this.isSidebarOpen = false;
    }, 300);
  }
}
