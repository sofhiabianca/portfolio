import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = '';
  isLoading = signal(false);
  
  currentProject: any = null;

  projectsData = [
    { 
      id: '01', 
      title: 'Spoon & Fork', 
      description: 'Developed an e-commerce website as a part of a Software Engineering course project for a client in the bakery manufacturing industry. The system was designed to help the client efficiently organize and track customer orders, streamlining their business operations.' 
    },
    { 
      id: '02', 
      title: 'Leonardo Physical Therapy Rehabilitation Clinic', 
      description: 'For our Capstone Project, we collaborated with a Los Angeles physical therapy clinic to create a tailored patient management system. This system efficiently organizes patient records and includes an integrated online appointment scheduler, streamlining clinic operations and enhancing the patient experience.' 
    },
    { id: '03', title: 'Dreamrs', description: 'Dreamrs (formerly known as Beauty Dream Hall) is an e-commerce platform tailored for beauty and wellness enthusiasts. During my internship, I collaborated closely with the lead developer, taking on key responsibilities and completing pending tasks to ensure the successful delivery of the project.' },
    { id: '04', title: 'The Street Market', description: 'Worked with a garment manufacturing client specializing in silkscreen printing to create a custom e-commerce website. Partnered with the creative team to design and implement a seamless interface that aligned with brand\'s identity and enhanced the user experience.' },
    { id: '05', title: 'DragonFi', description: 'I maintained and developed new features for both web and mobile applications, while also refactoring and enhancing the company\'s CMS. I worked closely with the backend team to ensure data accuracy and code security, crucial for managing client finances. I was also part of the company\'s PERA project, where we became the first SEC-accredited PERA administrator to implement it, marking a significant milestone for the company.' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.loadProject();
    });
  }

  loadProject() {
    this.isLoading.set(true);
    
    this.currentProject = this.projectsData.find(p => p.id === this.projectId);

    if (!this.currentProject) {
      this.router.navigate(['/works']);
      return;
    }

    setTimeout(() => this.isLoading.set(false), 800);
  }

  navigateTo(path: string) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.router.navigate([path]).then(() => this.isLoading.set(false));
    }, 1500);
  }
}