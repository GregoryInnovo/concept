import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiroDataService } from '../../services/storage/giro-data.service';

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
  @Input() clientData: GiroData | null = null;
  @Output() valorConfirmado = new EventEmitter<boolean>();

  valorGiro: number = 0;
  cuentaOrigen: string = '';
  oficinaPagoSeleccionada: string = '';
  isLoading: boolean = false;
  datosCalculados: boolean = false;

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
    '501 Oficina Santa Barbara',
    '502 Oficina Galerias', 
    '503 Oficina Avenida Chile',
    '504 Oficina Niza',
    '505 Oficina Centro Internacional',
    '507 Oficina Unicentro Bogota',
    '508 Oficina Ciudad  Salitre',
    '510 Oficina Calle 80 Bogota',
    '512 Oficina Principal Bogota',
    '514 Oficna Plaza de las Américas',
    '515 Oficna Cedritos',
    '516 Oficina Chapinero',
    '523 Oficina Sogamoso',
    '524 Oficina Villavicencio',
    '525 Oficina Tunja',
    '526 Oficina Yopal',
    '527 Oficina Chia',
    '528 Oficina Duitama',
    '100 Buga',
    '111 Oficina Buenaventura',
    '102 Oficina  Sur Cali',
    '103 Oficina Centro Cali',
    '105 Oficina Sede Nacional Cali',
    '106 Oficina Imbanaco Cali',
    '107 Oficina Unicentro Cali',
    '108 Oficina Chipichape Cali',
    '109 Oficina Cosmocentro Cali',
    '115 Oficina Liviana Farallones Cali',
    '116 Oficina Florencia',
    '113 Oficina Ibague',
    '114 Oficina Neiva',
    '901 Oficina Popayan',
    '117 Oficina Pasto',
    '112 Oficina Tulua',
    '801 Oficina Prado Barranquilla',
    '802 Oficina Barranquilla Norte',
    '806 Oficina Calle 93 Barranquilla',
    '807 Oficina Unico Barranquilla',
    '808 Oficina Valledupar',
    '809 Oficina Manga Cartagena',
    '810 Oficina Santa Marta',
    '811 Oficina Sincelejo',
    '812 Oficina Riohacha',
    '605 Oficina Cartago',
    '606 Oficina Manizales Centro',
    '602 Oficina Armenia Centro',
    '607 Oficina Manizales El Cable',
    '603 Oficina Pereira Centro',
    '604 Oficina Prometeo',
    '601 Oficina Armenia Norte',
    '317 Oficina Barrancabermeja',
    '312 Oficina Bucaramanga',
    '313 Oficina Cucuta',
    '316 Oficina Envigado',
    '318 Oficina Mayorca',
    '301 Oficina Ayacucho Medellin',
    '302 Oficina Oviedo Medellin',
    '304 Oficina Las Americas Medellin',
    '305 Oficina La 33 Medellin',
    '320 Oficina Monteria',
    '314 Oficina Pamplona',
    '311 Oficina Quibdo',
    '315 Oficina Rionegro',
    '701 Oficina Apartado',
    '319 Oficina Floridablanca',
    '401 Oficina Centro Palmira',
    '402 Oficina Versalles Palmira',
    '404 Oficina Llanogrande Palmira',
    '160 Banca Express',
    '161 Oficina Virtual'
  ];

  constructor(private giroDataService: GiroDataService) {
    // Recuperar datos guardados si existen
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      this.valorGiro = savedData.valorGiro || 0;
      this.cuentaOrigen = savedData.cuentaOrigen || '';
      this.oficinaPagoSeleccionada = savedData.nombreOficina || '';
      
      // Recuperar valores de impuestos
      this.valorComision = savedData.comision || 0;
      this.ivaComision = savedData.ivaComision || 0;
      this.gmfComision = savedData.gmfComision || 0;
      this.gmfIvaComision = savedData.gmfIva || 0;
      this.valorTotal = savedData.valorTotal || 0;
      
      // Si hay datos guardados, marcar como calculados
      if (this.valorTotal > 0) {
        this.datosCalculados = true;
        this.valorConfirmado.emit(true);
      }
    }
  }

  consultarImpuestos(): void {
    if (this.valorGiro > 0 && this.cuentaOrigen && this.oficinaPagoSeleccionada) {
      this.isLoading = true;
      this.datosCalculados = false;
      
      // Simulando una llamada a API con setTimeout
      setTimeout(() => {
        // Aquí en el futuro se llamaría a un servicio para obtener los valores de comisión, IVA, GMF, etc.
        this.valorComision = this.valorGiro * 0.20;    // 20% del valor del giro
        this.ivaComision = this.valorGiro * 0.13;      // 13% del valor del giro  
        this.gmfComision = this.valorGiro * 0.08;      // 8% del valor del giro
        this.gmfIvaComision = this.valorGiro * 0.04;   // 4% del valor del giro

        // Calcular el valor total sumando los valores anteriores y el valor del giro
        this.valorTotal = +this.valorComision + +this.ivaComision + +this.gmfComision + +this.gmfIvaComision + +this.valorGiro;
        
        // Actualizar los datos del giro
        const currentData = this.giroDataService.getGiroData();
        if (currentData) {
          this.giroDataService.updateGiroData({
            ...currentData,
            valorGiro: this.valorGiro,
            cuentaOrigen: this.cuentaOrigen,
            nombreOficina: this.oficinaPagoSeleccionada,
            comision: this.valorComision,
            ivaComision: this.ivaComision,
            gmfComision: this.gmfComision,
            gmfIva: this.gmfIvaComision,
            valorTotal: this.valorTotal
          });
        }

        this.isLoading = false;
        this.datosCalculados = true;
        // Emitir true para indicar que los datos están listos
        this.valorConfirmado.emit(true);
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
      this.valorTotal = +this.valorComision + +this.ivaComision + +this.gmfComision + +this.gmfIvaComision + +input.value
    } catch (error) {
      throw error
    }
  }
}
