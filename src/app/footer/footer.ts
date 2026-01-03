import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  isLoading = signal(false);

  constructor(public router: Router) {}

  isActive(link: string): boolean {
    const currentPath = this.router.url;
    const targetPath = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
    return currentPath === targetPath;
  }

navigateTo(link: string) {
  const path = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
  
  this.isLoading.set(true);
  
  this.router.navigateByUrl(path).then(() => {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000); 
  });
}
}