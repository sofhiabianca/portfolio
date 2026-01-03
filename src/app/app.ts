import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Footer } from './footer/footer'; 
import { CursorComponent } from './cursor/cursor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Footer, CursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoading = signal(false);
  showCopyright = signal(true);

  constructor(public router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showCopyright.set(!this.router.url.includes('/works'));
    });
  }

  startTransition() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.router.navigate(['/menu']).then(() => {
        this.isLoading.set(false);
      });
    }, 2000);
  }
}