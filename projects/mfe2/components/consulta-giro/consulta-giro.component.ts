import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiroDataService } from '../../services/giro-data.service';

interface ConsultaData {
  nombreCliente: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-consulta-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-giro.component.html',
  styleUrls: ['./consulta-giro.component.css']
})
export class ConsultaGiroComponent {
  @Output() datosListos = new EventEmitter<boolean>();

  selectedTipoId: string = '';
  selectedTipoSolicitud: string = '';
  numeroIdentificacion: string = '';
  isLoading: boolean = false;
  consultaData: ConsultaData | null = null;

  tiposSolicitud = [
    'P - GIRO',
    'N - CHEQUE'
  ];

  tiposIdentificacion = [
    'CC - CEDULA DE CIUDADANIA',
    'CE - CEDULA DE EXTRANJERIA',
    'PT - PERMISO POR PROTECCIÓN TEMPORAL',
    'NIT - EMPRESA'
  ];

  constructor(private giroDataService: GiroDataService) {
    // Recuperar datos guardados si existen
    const savedData = this.giroDataService.getGiroData();
    if (savedData) {
      this.selectedTipoId = savedData.tipoDocumentoSolicitante;
      this.selectedTipoSolicitud = savedData.tipoSolicitud;
      this.numeroIdentificacion = savedData.numeroDocumentoSolicitante;
      this.consultaData = {
        nombreCliente: savedData.nombreSolicitante,
        telefono: savedData.telefonoSolicitante,
        email: savedData.emailSolicitante
      };
      // Si hay datos guardados, emitimos que están listos
      this.datosListos.emit(true);
    }
  }

  cleanFields(key: string): void {
    try {
      if (key === 'type') {
        this.selectedTipoId = ''
        this.consultaData = null
        this.numeroIdentificacion = ''
      }
      if (key === 'typeDoc') {
        this.consultaData = null
        this.numeroIdentificacion = ''
      }
      // Si cambia alguno de los valores como tipo de identificación o tipo de solicitud, se actualiza el estado de los datos
      this.datosListos.emit(false); // evita que se emita true cuando se cambia el tipo de identificación o tipo de solicitud
    } catch (error) {
      throw error
    }
  }

  validateNumericInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.numeroIdentificacion = input.value;
    this.consultaData = null
  }

  onBuscar(): void {
    if (!this.selectedTipoId || !this.numeroIdentificacion || !this.selectedTipoSolicitud) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (this.numeroIdentificacion.length < 5 || this.numeroIdentificacion.length > 10) {
      alert('El número de identificación debe tener entre 5 y 10 dígitos');
      return;
    }

    this.isLoading = true;
    this.consultaData = null;
    this.datosListos.emit(false);

    // Simulando una llamada a API con setTimeout
    setTimeout(() => {
      this.consultaData = {
        nombreCliente: 'JUAN PÉREZ GONZÁLEZ',
        telefono: '3001234567',
        email: 'juan.perez@example.com'
      };

      this.giroDataService.updateGiroData({
        tipoSolicitud: this.selectedTipoSolicitud,
        tipoDocumentoSolicitante: this.selectedTipoId,
        numeroDocumentoSolicitante: this.numeroIdentificacion,
        nombreSolicitante: this.consultaData.nombreCliente,
        telefonoSolicitante: this.consultaData.telefono,
        emailSolicitante: this.consultaData.email,
        cuentaOrigen: '',
        valorGiro: 0,
        codigoOficina: '',
        nombreOficina: '',
        regional: 'Sur',
        cajero: 'LMDR4836',
        fechaEmision: new Date()
      });

      this.isLoading = false;
      // Emitimos que los datos están listos
      this.datosListos.emit(true);
    }, 1500);
    // }, 0);
  }
}
