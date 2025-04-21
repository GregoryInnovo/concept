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
    fecha: this.formatearFecha(new Date()),
    hora: this.formatearHora(new Date()),
    numeroGiro: '123533',
    codigoOficina: '901',
    nombreOficina: 'Popayan',
    regional: 'Sur',
    oficina: '901 Popayan - Sur',
    cajero: 'LMDR4836',
    numeroCuenta: '0206',
    solicitante: 'COOPERATIVA MULTIACT',
    identificacionSolicitante: 'NIT 891502999',
    valorGiro: 250000,
    comisiones: 20000,
    ivaComision: 3800,
    gmfComision: 80,
    gmfIva: 15.2,
    valorTotal: 273895.2,
    identificacionBeneficiario: 'CC 51896412',
    nombreBeneficiario: 'MARIA MORALES',
    email: 'pepitoperez76@gmail.com'
  };

  private formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  private formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }

  aceptar() {
    this.cerrarComprobante.emit();
  }
}
