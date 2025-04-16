import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  isOpen = true;
  navItems = [
    { icon: 'mail_outline', label: 'Emisión de Giros', route: '/emision-giros' },
    { icon: 'payments', label: 'Pago de Giros', route: '/pago-giros' },
    { icon: 'close', label: 'Anulación de Giros', route: '/anulacion-giros' },
    { icon: 'check_circle_outline', label: 'Autorizaciones', route: '/autorizaciones' },
    { icon: 'search', label: 'Consultas', route: '/consultas' },
    { icon: 'settings', label: 'Admin', route: '/admin' }
  ];

  constructor(private drawerService: DrawerService) { }

  ngOnInit(): void {
    this.drawerService.drawerOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
} 