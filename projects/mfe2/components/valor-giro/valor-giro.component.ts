import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiroDataService } from '../../services/storage/giro-data.service';
import { GetCuentasService, ResponseCuentas } from '../../services/emision/get-cuentas.service';
import { ResponseTipoGiro } from '../../services/emision/get-tipo-giro.service';
import { GetTipoMonedaService, ResponseTipoMoneda } from '../../services/emision/get-tipo-moneda.service';

interface GiroData {
  tipoSolicitud: ResponseTipoGiro | null;
  tipoDocumentoSolicitante: string;
  numeroDocumentoSolicitante: string;
  nombreSolicitante: string;
  telefonoSolicitante: string;
  emailSolicitante: string;
  cuentaOrigen?: ResponseCuentas | null;
  tipoMoneda?: ResponseTipoMoneda | null;
  valorGiro?: number;
  codigoOficina?: string;
  nombreOficina?: string;
  regional?: string;
  cajero?: string;
  fechaEmision?: Date;
  comision?: number;
  ivaComision?: number;
  gmfComision?: number;
  gmfIva?: number;
  valorTotal?: number;
}

@Component({
  selector: 'app-valor-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valor-giro.component.html',
  styleUrls: ['./valor-giro.component.css']
})
export class ValorGiroComponent {
  @Input() prevStep!: () => void;
  @Input() nextStep!: () => void;
  @Input() clientData: GiroData | null = null;
  @Output() valorConfirmado = new EventEmitter<boolean>();

  valorGiro: number = 0;
  cuentaOrigen: ResponseCuentas | null = null;
  tipoMoneda: ResponseTipoMoneda | null = null;
  isLoading: boolean = false;
  datosCalculados: boolean = false;

  // Valores calculados
  valorComision: number = 0;
  gmfComision: number = 0;
  valorTotal: number = 0;

  cuentasDisponibles: ResponseCuentas[] = []
  tipoMonedas: ResponseTipoMoneda[] = []

  constructor(
    private giroDataService: GiroDataService,
    private getCuentasService: GetCuentasService,
    private getTipoMonedaService: GetTipoMonedaService
  ) {
    // Recuperar datos guardados si existen
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      this.valorGiro = savedData.valorGiro || 0;

      // Recuperar valores de impuestos
      this.valorComision = savedData.comision || 0;
      this.gmfComision = savedData.gmfComision || 0;
      this.valorTotal = savedData.valorTotal || 0;

      // Si hay datos guardados, marcar como calculados
      if (this.valorTotal > 0) {
        this.datosCalculados = true;
        this.valorConfirmado.emit(true);
      }
    }
  }

  ngOnInit(): void {
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      this.getCuentasService.getClientCuentas(savedData.tipoDocumentoSolicitante, savedData.numeroDocumentoSolicitante).subscribe({
        next: (tipos) => {
          this.cuentasDisponibles = tipos;
          if (savedData.cuentaOrigen?.numeroCuenta) {
            this.cuentaOrigen = tipos.find(
              cuenta => cuenta.numeroCuenta === savedData.cuentaOrigen?.numeroCuenta
            ) || null;
          }
        },
        error: () => {
          this.cuentasDisponibles = [];
        },
      });
    }
    this.getTipoMonedaService.getTipoMoneda().subscribe({
      next: (tipos) => {
        this.tipoMonedas = tipos;
        const filterCop = tipos.filter(value => value.codigo === 'COP')
        if (filterCop && filterCop?.length > 0) {
          this.tipoMoneda = tipos[0]
        }
      },
      error: () => {
        this.tipoMonedas = [];
      },
    });
  }

  cleanFields(): void {
    this.datosCalculados = false
    this.valorComision = 0
    this.gmfComision = 0
    // Actualizar los datos del giro
    const currentData = this.giroDataService.getGiroData();
    if (currentData) {
      this.giroDataService.updateGiroData({
        ...currentData,
        valorGiro: this.valorGiro,
        cuentaOrigen: this.cuentaOrigen,
        tipoMoneda: this.tipoMoneda,
        comision: this.valorComision,
        gmfComision: this.gmfComision,
        valorTotal: this.valorTotal
      });
    }
    this.prevStep();
  }

  consultarImpuestos(): void {
    if (this.valorGiro > 0 && this.cuentaOrigen) {
      this.isLoading = true;
      this.datosCalculados = false;

      // Simulando una llamada a API con setTimeout
      setTimeout(() => {
        // Aquí en el futuro se llamaría a un servicio para obtener los valores de comisión, IVA, GMF, etc.
        this.valorComision = this.valorGiro * 0.20;    // 20% del valor del giro
        this.gmfComision = this.valorGiro * 0.08;      // 8% del valor del giro

        // Calcular el valor total sumando los valores anteriores y el valor del giro
        this.valorTotal = +this.valorComision + +this.gmfComision + +this.valorGiro;

        // Actualizar los datos del giro
        const currentData = this.giroDataService.getGiroData();
        if (currentData) {
          this.giroDataService.updateGiroData({
            ...currentData,
            valorGiro: this.valorGiro,
            cuentaOrigen: this.cuentaOrigen,
            tipoMoneda: this.tipoMoneda,
            comision: this.valorComision,
            gmfComision: this.gmfComision,
            valorTotal: this.valorTotal
          });
        }

        this.isLoading = false;
        this.datosCalculados = true;
        // Emitir true para indicar que los datos están listos
        this.valorConfirmado.emit(true);
        this.nextStep();
      }, 1500);
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  confirmarValor() {
    if (this.datosCalculados) {
      this.valorConfirmado.emit(true);
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
      this.valorTotal = +this.valorComision + +this.gmfComision + +input.value
      this.cleanFields()
    } catch (error) {
      throw error
    }
  }
}
