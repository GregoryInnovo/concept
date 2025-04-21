import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiroDataService } from '../../services/giro-data.service';

interface GiroData {
  tipoSolicitud: string;
  tipoDocumentoSolicitante: string;
  numeroDocumentoSolicitante: string;
  nombreSolicitante: string;
  telefonoSolicitante: string;
  emailSolicitante: string;
  cuentaOrigen?: string;
  valorGiro?: number;
  codigoOficina?: string;
  nombreOficina?: string;
  regional?: string;
  cajero?: string;
  fechaEmision?: Date;
}

@Component({
  selector: 'app-valor-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valor-giro.component.html',
  styleUrls: ['./valor-giro.component.css']
})
export class ValorGiroComponent {
  @Input() clientData: GiroData | null = null;
  @Output() valorConfirmado = new EventEmitter<void>();

  valorGiro: number = 0;
  cuentaOrigen: string = '';
  oficinaPagoSeleccionada: string = '';

  // Valores calculados
  valorComision: number = 0;
  ivaComision: number = 0;
  gmfComision: number = 0;
  gmfIvaComision: number = 0;
  valorTotal: number = 0;

  cuentasDisponibles = [
    '1234 - Cuenta Corriente',
    '5678 - Cuenta de Ahorros'
  ];

  oficinasPago = [
    'Oficina Principal',
    'Sucursal Norte',
    'Sucursal Sur'
  ];

  constructor(private giroDataService: GiroDataService) {
    // Recuperar datos guardados si existen
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      this.valorGiro = savedData.valorGiro;
      this.cuentaOrigen = savedData.cuentaOrigen;
      this.oficinaPagoSeleccionada = savedData.nombreOficina;
      // Calcular valores
      this.valorTotal = +this.valorComision + +this.ivaComision + +this.gmfComision + +this.gmfIvaComision + savedData.valorGiro;
      // Si hay datos guardados, emitimos que están listos
      this.valorConfirmado.emit();
    }
  }

  confirmarValor() {
    if (this.valorGiro > 0 && this.cuentaOrigen && this.oficinaPagoSeleccionada) {
      // Actualizar los datos del giro
      const currentData = this.giroDataService.getGiroData();
      if (currentData) {
        this.giroDataService.updateGiroData({
          ...currentData,
          valorGiro: this.valorGiro,
          cuentaOrigen: this.cuentaOrigen,
          nombreOficina: this.oficinaPagoSeleccionada
        });
        // Calcular valores
        const valores = this.giroDataService.calcularValores(this.valorGiro);
        this.giroDataService.updateGiroData(valores);
      }
      this.valorConfirmado.emit();
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  formatearValor(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  }

  validateTotalValue(event: Event): void {
    try {
      const input = event.target as HTMLInputElement;
      this.valorTotal = +this.valorComision + +this.ivaComision + +this.gmfComision + +this.gmfIvaComision + +input.value
    } catch (error) {
      throw error
    }
  }
}
