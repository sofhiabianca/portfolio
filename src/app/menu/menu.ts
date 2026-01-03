import { Component, signal, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  isLoading = signal(false);
  links = ['HOME', 'ABOUT', 'WORKS'];
  selectedIndex = 0;

  @ViewChildren('menuBtn') menuButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // focus the first button so keyboard navigation works immediately
    setTimeout(() => this.focusButton(this.selectedIndex));
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

  onClickNavigate(link: string, index: number) {
    this.selectedIndex = index;
    this.navigateTo(link);
  }

  onKeydown(event: KeyboardEvent) {
    const count = this.menuButtons?.length ?? this.links.length;
    if (!count) return;

    switch (event.key) {
      case 'ArrowDown':
        this.selectedIndex = Math.min(this.selectedIndex + 1, count - 1);
        this.focusButton(this.selectedIndex);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.focusButton(this.selectedIndex);
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'Enter':
        this.navigateTo(this.links[this.selectedIndex]);
        event.preventDefault();
        break;
    }
  }

  private focusButton(index: number) {
    const arr = this.menuButtons?.toArray();
    if (arr && arr[index]) {
      arr[index].nativeElement.focus();
    }
  }
}