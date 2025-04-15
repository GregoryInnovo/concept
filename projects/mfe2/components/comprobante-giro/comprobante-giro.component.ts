import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comprobante-giro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprobante-giro.component.html',
  styleUrls: ['./comprobante-giro.component.css']
})
export class ComprobanteGiroComponent {
  @Output() cerrarComprobante = new EventEmitter<void>();

  datosComprobante = {
    numeroGiro: '123533',
    oficina: '901 Popayan',
    cajero: 'LMDR4836',
    numeroCuenta: '0206',
    solicitante: 'COOPERATIVA MULTIACT',
    identificacionSolicitante: 'NIT 891502999',
    valorGiro: '$ 250.000,00',
    valorComision: '$ 20.000,00',
    valorTotal: '$ 282.150,00',
    identificacionBeneficiario: 'CC 51896412',
    nombreBeneficiario: 'MARIA MORALES',
    email: 'pepitoperez76@gmail.com',
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  };

  aceptar() {
    this.cerrarComprobante.emit();
  }
}
