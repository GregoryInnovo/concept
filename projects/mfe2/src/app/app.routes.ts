import { Routes } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { EmisionGirosComponent } from '../../components/emision-giros/emision-giros.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'emision-giros', pathMatch: 'full' },
      { path: 'emision-giros', component: EmisionGirosComponent },
      { path: 'pago-giros', component: LayoutComponent },
      { path: 'anulacion-giros', component: LayoutComponent },
      { path: 'autorizaciones', component: LayoutComponent },
      { path: 'consultas', component: LayoutComponent },
      { path: 'admin', component: LayoutComponent },
    ]
  }
];
