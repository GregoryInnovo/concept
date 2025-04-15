import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validacion-biometrica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validacion-biometrica.component.html',
  styleUrls: ['./validacion-biometrica.component.css']
})
export class ValidacionBiometricaComponent {
  @Output() validacionCompletada = new EventEmitter<void>();
  
  showModal = false;
  clientData = {
    nombre: 'Pepito Perez',
    telefono: '311 2896300',
    email: 'pepitoperez76@gmail.com'
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmarValidacion() {
    this.closeModal();
    this.validacionCompletada.emit();
  }
}
