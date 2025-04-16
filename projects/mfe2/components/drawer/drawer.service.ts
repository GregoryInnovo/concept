import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  // Initialize with drawer open by default
  private drawerOpenSubject = new BehaviorSubject<boolean>(true);
  drawerOpen$ = this.drawerOpenSubject.asObservable();

  constructor() { }

  toggleDrawer() {
    this.drawerOpenSubject.next(!this.drawerOpenSubject.value);
  }

  setDrawerState(isOpen: boolean) {
    this.drawerOpenSubject.next(isOpen);
  }

  getDrawerState(): boolean {
    return this.drawerOpenSubject.value;
  }
} 