import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprobanteGiroComponent } from '../comprobante-giro/comprobante-giro.component';
import { GiroDataService } from '../../services/giro-data.service';

@Component({
  selector: 'app-beneficiario-giro',
  standalone: true,
  imports: [CommonModule, FormsModule, ComprobanteGiroComponent],
  templateUrl: './beneficiario-giro.component.html',
  styleUrls: ['./beneficiario-giro.component.css']
})
export class BeneficiarioGiroComponent implements OnInit {
  @Output() beneficiarioConfirmado = new EventEmitter<void>();
  @Output() reiniciarProceso = new EventEmitter<void>();

  showComprobante = false;
  solicitanteData: any = null;

  beneficiarioData = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombreCliente: ''
  };

  autorizadoData = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombreAutorizado: ''
  };

  tiposDocumentoBeneficiario = [
    'CC - CEDULA DE CIUDADANIA',
    'CE - CEDULA DE EXTRANGERIA',
    'PT - PERMISO POR PROTECCIÓN TEMPORAL',
    'NIT - EMPRESA'
  ];

  tiposDocumentoAutorizado = [
    'CC - CEDULA DE CIUDADANIA',
    'CE - CEDULA DE EXTRANGERIA',
    'PA - PASAPORTE',
    'PPT - PERMISO POR PROTECCIÓN TEMPORAL',
    'NIT - NUMERO DE IDENTIFICACION TRIBUTARIA'
  ];

  constructor(private giroDataService: GiroDataService) {}

  ngOnInit() {
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      // Guardar datos del solicitante para mostrar en el resumen
      this.solicitanteData = {
        tipoDocumento: savedData.tipoDocumentoSolicitante,
        numeroDocumento: savedData.numeroDocumentoSolicitante,
        nombreCliente: savedData.nombreSolicitante,
        telefono: savedData.telefonoSolicitante,
        email: savedData.emailSolicitante,
        valorTotalGiro: this.formatearMoneda(savedData.valorTotal),
        cuentaOrigen: savedData.cuentaOrigen
      };

      if (savedData.tipoDocumentoBeneficiario) {
        this.beneficiarioData = {
          tipoDocumento: savedData.tipoDocumentoBeneficiario,
          numeroDocumento: savedData.numeroDocumentoBeneficiario,
          nombreCliente: savedData.nombreBeneficiario
        };
      }
      if (savedData.tipoDocumentoAutorizado) {
        this.autorizadoData = {
          tipoDocumento: savedData.tipoDocumentoAutorizado,
          numeroDocumento: savedData.numeroDocumentoAutorizado || '',
          nombreAutorizado: savedData.nombreAutorizado || ''
        };
      }
    }
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }

  validateNumericInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.id === 'numDoc') {
      this.beneficiarioData.numeroDocumento = input.value;
    } else if (input.id === 'numDocAutorizado') {
      this.autorizadoData.numeroDocumento = input.value;
    }
  }

  validateNombreInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 20) {
      input.value = input.value.substring(0, 20);
    }
    if (input.id === 'nombre') {
      this.beneficiarioData.nombreCliente = input.value;
    } else if (input.id === 'nombreAutorizado') {
      this.autorizadoData.nombreAutorizado = input.value;
    }
  }

  validateAlphanumericInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    if (input.id === 'numDocAutorizado') {
      this.autorizadoData.numeroDocumento = input.value;
    }
  }

  emitir() {
    if (!this.beneficiarioData.tipoDocumento || 
        !this.beneficiarioData.numeroDocumento || 
        !this.beneficiarioData.nombreCliente) {
      alert('Por favor complete todos los campos del beneficiario');
      return;
    }

    if (this.beneficiarioData.numeroDocumento.length < 5 || 
        this.beneficiarioData.numeroDocumento.length > 10) {
      alert('El número de identificación debe tener entre 5 y 10 dígitos');
      return;
    }

    if (this.beneficiarioData.nombreCliente.length > 20) {
      alert('El nombre del beneficiario no puede exceder los 20 caracteres');
      return;
    }

    // Validar campos del autorizado si están presentes
    if (this.autorizadoData.tipoDocumento || 
        this.autorizadoData.numeroDocumento || 
        this.autorizadoData.nombreAutorizado) {
      
      if (!this.autorizadoData.tipoDocumento || 
          !this.autorizadoData.numeroDocumento || 
          !this.autorizadoData.nombreAutorizado) {
        alert('Si ingresa información del autorizado, debe completar todos los campos');
        return;
      }

      if (this.autorizadoData.numeroDocumento.length < 5 || 
          this.autorizadoData.numeroDocumento.length > 10) {
        alert('El número de identificación del autorizado debe tener entre 5 y 10 caracteres');
        return;
      }

      if (this.autorizadoData.nombreAutorizado.length > 20) {
        alert('El nombre del autorizado no puede exceder los 20 caracteres');
        return;
      }
    }

    // Actualizar datos del giro
    this.giroDataService.updateGiroData({
      tipoDocumentoBeneficiario: this.beneficiarioData.tipoDocumento,
      numeroDocumentoBeneficiario: this.beneficiarioData.numeroDocumento,
      nombreBeneficiario: this.beneficiarioData.nombreCliente,
      tipoDocumentoAutorizado: this.autorizadoData.tipoDocumento || undefined,
      numeroDocumentoAutorizado: this.autorizadoData.numeroDocumento || undefined,
      nombreAutorizado: this.autorizadoData.nombreAutorizado || undefined,
      numeroGiro: Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    });

    this.showComprobante = true;
  }

  onCerrarComprobante() {
    this.showComprobante = false;
    this.reiniciarProceso.emit();
  }
}
