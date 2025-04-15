import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="mfe1-container">
      <h1>Micro Frontend 1</h1>
      <p>Este es el contenido del Micro Frontend 1</p>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .mfe1-container {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 10px;
    }
    h1 {
      color: #333;
    }
  `]
})
export class AppComponent {
  title = 'mfe1';
}
