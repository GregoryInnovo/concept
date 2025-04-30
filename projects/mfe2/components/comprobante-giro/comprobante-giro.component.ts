import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiroDataService, GiroData } from '../../services/storage/giro-data.service';

@Component({
  selector: 'app-comprobante-giro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprobante-giro.component.html',
  styleUrls: ['./comprobante-giro.component.css']
})
export class ComprobanteGiroComponent implements OnInit {
  @Input() closeResume!: () => void;
  @Input() isResumen: boolean = false;
  @Output() cerrarComprobante = new EventEmitter<void>();

  datosComprobante: GiroData | null = null;
  resumen: boolean = false;

  constructor(private giroDataService: GiroDataService) {}

  ngOnInit() {
    this.resumen = this.isResumen;
    this.datosComprobante = this.giroDataService.getGiroData();
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  formatearHora(fecha: Date): string {
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
    this.giroDataService.clearGiroData();
    this.cerrarComprobante.emit();
  }
}
