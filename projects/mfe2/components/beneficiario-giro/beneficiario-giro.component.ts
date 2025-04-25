import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprobanteGiroComponent } from '../comprobante-giro/comprobante-giro.component';
import { GiroDataService } from '../../services/storage/giro-data.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ListaRestrictivaService } from '../../services/emision/lista-restrictiva.service';
import { EmitirGiroService, EmitirGiroRequest } from '../../services/emision/emitir-giro.service';

@Component({
  selector: 'app-beneficiario-giro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComprobanteGiroComponent,
    ConfirmationDialogComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './beneficiario-giro.component.html',
  styleUrls: ['./beneficiario-giro.component.css']
})
export class BeneficiarioGiroComponent implements OnInit {
  @Output() beneficiarioConfirmado = new EventEmitter<void>();
  @Output() reiniciarProceso = new EventEmitter<void>();

  showComprobante = false;
  showConfirmDialog = false;
  isLoading = false;
  solicitanteData: any = null;
  isAutorizadoChecked = false;

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

  constructor(
    private giroDataService: GiroDataService,
    private getListaRestrivtivaService: ListaRestrictivaService,
    private emitirGiroService: EmitirGiroService
  ) { }

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
        valorTotalGiro: savedData.valorTotal,
        cuentaOrigen: savedData.cuentaOrigen
      };

      // Set autorizado checkbox based on tipo de solicitud
      this.isAutorizadoChecked = savedData.tipoSolicitud === 'N - CHEQUE';

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

    this.getListaRestrivtivaService.getClientListaRestrictiva(this.beneficiarioData.tipoDocumento, this.beneficiarioData.numeroDocumento).subscribe({
      next: (dataBeneficiario) => {
        if (dataBeneficiario?.data) {
          this.showConfirmDialog = true;
        } else {
          alert('El usuario tiene reportes y esta en listas restrictivas, por lo que no se puede realizar la transacción')
        }
      },
      error: () => {
        alert('Ocurrió un error al consultar el beneficiario')
      },
    });
  }

  onConfirmEmitir() {
    this.showConfirmDialog = false;
    this.isLoading = true;

    // Obtener datos del giro
    const giroData = this.giroDataService.getGiroData();
    if (!giroData) {
      this.isLoading = false;
      alert('No hay datos del giro para emitir.');
      return;
    }

    // Validaciones para evitar error 400
    if (!giroData.emailSolicitante || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(giroData.emailSolicitante)) {
      this.isLoading = false;
      alert('El email del solicitante debe ser válido.');
      return;
    }
    if (giroData.valorTotal <= 0) {
      this.isLoading = false;
      alert('El total a pagar debe ser mayor que cero.');
      return;
    }
    if (giroData.valorGiro <= 0) {
      this.isLoading = false;
      alert('El valor de la solicitud debe ser mayor que cero.');
      return;
    }

    // Construir el body para el endpoint
    const body: EmitirGiroRequest = {
      idGiro: giroData.numeroGiro ? parseInt(giroData.numeroGiro, 10) : 0,
      codigoEstado: 'P', // Procesando
      codigoTipo: giroData.tipoSolicitud || 'N',
      nombreOficina: giroData.nombreOficina || 'Oficina',
      usuarioRed: giroData.cajero || 'usuario',
      identificacionBeneficiario: giroData.numeroDocumentoBeneficiario,
      nombreBeneficiario: giroData.nombreBeneficiario,
      tipoIdentificacionBeneficiario: giroData.tipoDocumentoBeneficiario,
      identificacionSolicitante: giroData.numeroDocumentoSolicitante,
      nombreSolicitante: giroData.nombreSolicitante,
      tipoIdentificacionSolicitante: giroData.tipoDocumentoSolicitante,
      emailSolicitante: giroData.emailSolicitante,
      celularSolicitante: giroData.telefonoSolicitante,
      valorSolicitud: giroData.valorGiro,
      valorComision: giroData.comision,
      ivaComision: giroData.ivaComision,
      gmfIvaComision: giroData.gmfIva,
      gmfComision: giroData.gmfComision,
      totalPagar: giroData.valorTotal,
      cuentaOrigen: giroData.cuentaOrigen ? giroData.cuentaOrigen.numeroCuenta : ''
    };

    this.emitirGiroService.emitirGiro(body).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          // Actualizar datos del giro
          this.giroDataService.updateGiroData({
            tipoDocumentoBeneficiario: this.beneficiarioData.tipoDocumento,
            numeroDocumentoBeneficiario: this.beneficiarioData.numeroDocumento,
            nombreBeneficiario: this.beneficiarioData.nombreCliente,
            tipoDocumentoAutorizado: this.autorizadoData.tipoDocumento || undefined,
            numeroDocumentoAutorizado: this.autorizadoData.numeroDocumento || undefined,
            nombreAutorizado: this.autorizadoData.nombreAutorizado || undefined,
            numeroGiro: giroData.numeroGiro
          });
          this.showComprobante = true;
        } else {
          alert('No se pudo emitir el giro.');
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error && error.error.data) {
          alert('Error validando campos: ' + (Array.isArray(error.error.data) ? error.error.data.join(', ') : error.error.data));
        } else {
          alert('Ocurrió un error al emitir el giro.');
        }
      }
    });
  }

  onCancelEmitir() {
    this.showConfirmDialog = false;
  }

  onCerrarComprobante() {
    this.showComprobante = false;
    this.reiniciarProceso.emit();
  }
}
