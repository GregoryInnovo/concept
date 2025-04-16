import { Routes } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'emision-giros', pathMatch: 'full' },
      // Use simple redirects for now since the route modules don't exist yet
      { path: 'emision-giros', component: LayoutComponent },
      { path: 'pago-giros', component: LayoutComponent },
      { path: 'anulacion-giros', component: LayoutComponent },
      { path: 'autorizaciones', component: LayoutComponent },
      { path: 'consultas', component: LayoutComponent },
      { path: 'admin', component: LayoutComponent },
    ]
  }
];
