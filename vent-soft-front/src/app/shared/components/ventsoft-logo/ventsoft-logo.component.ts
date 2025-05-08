import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ventsoft-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ventsoft-logo.component.html',
  styleUrls: ['./ventsoft-logo.component.css'],
})
export default class VentsoftLogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showTagline: boolean = false;
  @Input() isDark: boolean = false;

  sizeClasses: { [key: string]: { container: string; icon: number; textSize: string; taglineSize: string } } = {
    sm: {
      container: 'text-base',
      icon: 16,
      textSize: 'text-lg font-bold',
      taglineSize: 'text-xs',
    },
    md: {
      container: 'text-xl',
      icon: 20,
      textSize: 'text-2xl font-bold',
      taglineSize: 'text-sm',
    },
    lg: {
      container: 'text-2xl',
      icon: 24,
      textSize: 'text-3xl font-bold',
      taglineSize: 'text-base',
    },
    xl: {
      container: 'text-3xl',
      icon: 32,
      textSize: 'text-4xl font-bold',
      taglineSize: 'text-lg',
    },
  };

  get textColor(): string {
    return this.isDark ? 'text-white' : 'text-gray-800';
  }

  get accentColor(): string {
    return this.isDark ? 'text-sky-400' : 'text-sky-600';
  }
}