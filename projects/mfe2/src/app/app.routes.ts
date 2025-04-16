import { Routes } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { EmisionGirosComponent } from '../../components/emision-giros/emision-giros.component';
import { PagoGirosComponent } from '../../components/pago-giros/pago-giros.component';
import { AnulacionGirosComponent } from '../../components/anulacion-giros/anulacion-giros.component';
import { AutorizacionesComponent } from '../../components/autorizaciones/autorizaciones.component';
import { ConsultasComponent } from '../../components/consultas/consultas.component';
import { AdminComponent } from '../../components/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'emision-giros', pathMatch: 'full' },
      { path: 'emision-giros', component: EmisionGirosComponent },
      { path: 'pago-giros', component: PagoGirosComponent },
      { path: 'anulacion-giros', component: AnulacionGirosComponent },
      { path: 'autorizaciones', component: AutorizacionesComponent },
      { path: 'consultas', component: ConsultasComponent },
      { path: 'admin', component: AdminComponent },
    ]
  }
];
