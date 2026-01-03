import { Component, HostListener, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
})
export class CursorComponent implements OnInit, OnDestroy {
  private mouseX = 0;
  private mouseY = 0;
  private posX = 0;
  private posY = 0;
  private rafId: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.rafLoop();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    const dot = this.el.nativeElement.querySelector('.cursor-dot');
    const ring = this.el.nativeElement.querySelector('.cursor-ring');
    if (dot) this.renderer.addClass(dot, 'cursor-active');
    if (ring) this.renderer.addClass(ring, 'cursor-active');
    setTimeout(() => {
      if (dot) this.renderer.removeClass(dot, 'cursor-active');
      if (ring) this.renderer.removeClass(ring, 'cursor-active');
    }, 150);
  }

  private rafLoop() {
    const ease = 0.18;
    this.posX += (this.mouseX - this.posX) * ease;
    this.posY += (this.mouseY - this.posY) * ease;

    const dot = this.el.nativeElement.querySelector('.cursor-dot');
    const ring = this.el.nativeElement.querySelector('.cursor-ring');

    if (dot) {
      this.renderer.setStyle(dot, 'transform', `translate3d(${this.posX}px, ${this.posY}px, 0) translate(-50%, -50%)`);
    }
    if (ring) {
      this.renderer.setStyle(ring, 'transform', `translate3d(${this.posX}px, ${this.posY}px, 0) translate(-50%, -50%)`);
    }

    this.rafId = requestAnimationFrame(() => this.rafLoop());
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
