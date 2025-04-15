import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valor-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valor-giro.component.html',
  styleUrls: ['./valor-giro.component.css']
})
export class ValorGiroComponent {
  @Output() valorConfirmado = new EventEmitter<void>();

  clientData = {
    tipoDocumento: 'CC',
    numeroDocumento: '1019963258',
    nombreCliente: 'Pepito Perez',
    telefono: '311 2896300',
    email: 'pepitoperez76@gmail.com'
  };

  valorGiro: string = '250.000,00';
  cuentaOrigen: string = '406531313';
  valorComision: string = '20.000,00';
  valorTotal: string = '282.150,00';

  cuentasDisponibles = [
    '406531313',
    '406531314',
    '406531315'
  ];

  confirmarValor() {
    this.valorConfirmado.emit();
  }

  formatearValor(valor: string): string {
    // Aquí se podría implementar la lógica de formateo de valores monetarios
    return valor;
  }
}
