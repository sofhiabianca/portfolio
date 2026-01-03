import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu';
import { AboutComponent } from './about/about';
import { WorksComponent } from './works/works';
import { App } from './app'; 

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'works', component: WorksComponent },

  { path: '**', redirectTo: '' }
];