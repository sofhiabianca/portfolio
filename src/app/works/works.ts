import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './works.html',
  styleUrl: './works.css'
})
export class WorksComponent implements OnInit {
  isLoading = signal(false);
  showCopyright = signal(true);

  options: AnimationOptions = {
    path: '/folder-anim.json',
    autoplay: false,
    loop: false
  };

  folders: any[] = [
    { id: '01', zoneTop: [15, 30], zoneLeft: [20, 35] }, 
    { id: '02', zoneTop: [10, 25], zoneLeft: [45, 55] }, 
    { id: '03', zoneTop: [20, 40], zoneLeft: [65, 80] },
    { id: '04', zoneTop: [50, 65], zoneLeft: [15, 30] }, 
    { id: '05', zoneTop: [65, 80], zoneLeft: [35, 50] },
  ];

  projectsData = [
    { 
      id: '01', 
      title: 'Spoon & Fork', 
      image: 'spoon-and-fork.png',
      description: 'Developed an e-commerce website as a part of a Software Engineering course project for a client in the bakery manufacturing industry. The system was designed to help the client efficiently organize and track customer orders, streamlining their business operations.' 
    },
    { 
      id: '02', 
      title: 'Leonardo Physical Therapy Rehabilitation Clinic', 
      image: 'leonardo.png',
      link: 'https://www.leonardophysiotherapy.com/',
      description: 'For our Capstone Project, we collaborated with a Los Angeles physical therapy clinic to create a tailored patient management system. This system efficiently organizes patient records and includes an integrated online appointment scheduler, streamlining clinic operations and enhancing the patient experience.' 
    },
    { id: '03', title: 'Dreamrs', image: 'dreamrs.png', link: 'https://www.dreamrs.co/', description: 'Dreamrs (formerly known as Beauty Dream Hall) is an e-commerce platform tailored for beauty and wellness enthusiasts. During my internship, I collaborated closely with the lead developer, taking on key responsibilities and completing pending tasks to ensure the successful delivery of the project.' },
    { id: '04', title: 'The Street Market', image: 'the-street-market.png', link: 'https://tsm-landing-page.vercel.app/', description: 'Worked with a garment manufacturing client specializing in silkscreen printing to create a custom e-commerce website. Partnered with the creative team to design and implement a seamless interface that aligned with brand\'s identity and enhanced the user experience.' },
    { id: '05', title: 'DragonFi', image: 'dragonfi.png', link: 'https://www.dragonfi.ph', description: 'I maintained and developed new features for both web and mobile applications, while also refactoring and enhancing the company\'s CMS. I worked closely with the backend team to ensure data accuracy and code security, crucial for managing client finances. I was also part of the company\'s PERA project, where we became the first SEC-accredited PERA administrator to implement it, marking a significant milestone for the company.' },
  ];

  selectedProject: any = null;
  modalOpen = false;

  constructor(public router: Router) {}

  ngOnInit() {
    this.folders.forEach(f => {
      f.top = this.getRandomInt(f.zoneTop[0], f.zoneTop[1]) + '%';
      f.left = this.getRandomInt(f.zoneLeft[0], f.zoneLeft[1]) + '%';
      f.delay = (Math.random() * -8).toFixed(2) + 's';
    });
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  animationCreated(animationItem: AnimationItem, folder: any): void {
    folder.animInstance = animationItem;
  }

  onHover(folder: any): void {
    if (folder.animInstance) {
      folder.animInstance.setDirection(1);
      folder.animInstance.play();
    }
  }

  onLeave(folder: any): void {
    if (folder.animInstance) {
      folder.animInstance.setDirection(-1);
      folder.animInstance.play();
    }
  }

  navigateToProject(id: string) {
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.router.navigate(['/project', id]).then(() => {
        this.isLoading.set(false);
      });
    }, 800);
  }

  openProjectModal(id: string) {
    const project = this.projectsData.find(p => p.id === id);
    if (!project) return;
    this.selectedProject = project;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    this.modalOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  isActive(link: string): boolean {
    const currentPath = this.router.url;
    const targetPath = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
    return currentPath === targetPath;
  }

  menuNavigation(link: string) {
    const path = link === 'HOME' ? '/' : `/${link.toLowerCase()}`;
    this.isLoading.set(true);
     
    setTimeout(() => {
      this.router.navigateByUrl(path).then(() => {
        this.isLoading.set(false);
      });
    }, 800);
  }
}