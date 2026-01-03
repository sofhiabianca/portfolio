import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  isLoading = signal(false);

  // typewriter state
  displayedText = '';
  private fullText = `Hi, I'm Sofhia, a frontend developer from the Philippines with a passion for creating visually appealing and user-friendly applications. I specialize in Angular and JavaScript, have experience in Shopify, and am actively expanding my backend skills to become a full-stack developer. Beyond web development, I also build mobile apps using React Native. Since starting my journey in 2020, I’ve been dedicated to continuously refining my skills and delivering smooth, engaging experiences across platforms.`;
  private typingTimer: number | null = null;
  private typingDelay = 18; // ms per character (used as target frame-per-char ratio)

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Respect user's reduced motion preference
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.displayedText = this.fullText;
      return;
    }

    // smooth typing using requestAnimationFrame with time-based accumulation
    let index = 0;
    const startDelay = 120; // shorter startup so it feels snappier
    const msPerChar = this.typingDelay;

    const start = () => {
      let last = performance.now();
      let acc = 0;

      const step = (now: number) => {
        const delta = now - last;
        last = now;
        acc += delta;
        const toAdd = Math.floor(acc / msPerChar);
        if (toAdd > 0) {
          this.displayedText += this.fullText.substr(index, toAdd);
          index += toAdd;
          acc = acc - toAdd * msPerChar;
        }
        if (index < this.fullText.length) {
          this.typingTimer = requestAnimationFrame(step);
        } else {
          this.typingTimer = null;
        }
      };

      this.typingTimer = requestAnimationFrame(step);
    };

    // start after small delay
    this.typingTimer = window.setTimeout(() => {
      // clear that timer id reference and start RAF loop
      this.typingTimer = null;
      start();
    }, startDelay) as unknown as number;
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      // could be either a timeout id or RAF id - attempt to cancel both safely
      try { cancelAnimationFrame(this.typingTimer); } catch {}
      try { clearTimeout(this.typingTimer as unknown as number); } catch {}
      this.typingTimer = null;
    }
  }

  navigateTo(path: string) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.router.navigate([path]).then(() => {
        this.isLoading.set(false);
      });
    }, 1500);
  }
  isActive(link: string): boolean {
    const currentPath = this.router.url;
    const targetPath = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
    return currentPath === targetPath;
  }

  menuNavigation(link: string) {
    const path = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
    
    this.isLoading.set(true);
    
    // Optional: Add a small delay before navigating to let the user see the "loading"
    setTimeout(() => {
      this.router.navigateByUrl(path).then(() => {
        // The isLoading state usually resets on the next component's ngOnInit, 
        // but we'll clear it here as a fallback
        this.isLoading.set(false);
      });
    }, 800);
  }
}