import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';
import { DrawerService } from '../drawer/drawer.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isDrawerOpen = true;

  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {
    this.drawerService.drawerOpen$.subscribe(isOpen => {
      this.isDrawerOpen = isOpen;
    });
  }
} 