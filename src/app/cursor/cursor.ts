import { Component, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
})
export class CursorComponent {
  @ViewChild('cursorContainer') container!: ElementRef;

  private lastX = 0;
  private lastY = 0;
  private threshold = 15;  

  constructor(private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const distance = Math.hypot(e.clientX - this.lastX, e.clientY - this.lastY);

    if (distance >= this.threshold) {
      this.createPixel(e.clientX, e.clientY);
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    }
  }

  private createPixel(x: number, y: number) {
    if (!this.container) return;

    const pixel = this.renderer.createElement('div');
    this.renderer.addClass(pixel, 'pixel-debris');

    const randomRotation = Math.random() * 360;
    const randomScale = 0.8 + Math.random() * 0.5;  

    this.renderer.setStyle(pixel, 'left', `${x}px`);
    this.renderer.setStyle(pixel, 'top', `${y}px`);
    this.renderer.setStyle(pixel, 'transform', `translate(-50%, -50%) rotate(${randomRotation}deg) scale(${randomScale})`);

    this.renderer.appendChild(this.container.nativeElement, pixel);

    setTimeout(() => {
      this.renderer.removeChild(this.container.nativeElement, pixel);
    }, 500);
  }
}