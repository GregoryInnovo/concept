import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientDataService, ClientData } from '../../services/client-data.service';

@Component({
  selector: 'app-consulta-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-giro.component.html',
  styleUrls: ['./consulta-giro.component.css']
})
export class ConsultaGiroComponent {
  selectedTipoId: string = '';
  selectedTipoSolicitud: string = '';
  numeroIdentificacion: string = '';
  isLoading: boolean = false;
  clientData: ClientData | null = null;

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

  constructor(private clientDataService: ClientDataService) {
    // Recuperar datos guardados si existen
    const savedData = this.clientDataService.getClientData();
    if (savedData) {
      this.clientData = savedData;
      this.selectedTipoId = savedData.tipoDocumento;
      this.selectedTipoSolicitud = savedData.tipoSolicitud;
      this.numeroIdentificacion = savedData.numeroDocumento;
    }
  }

  validateNumericInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.numeroIdentificacion = input.value;
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
    this.clientData = null;

    // Simulando una llamada a API con setTimeout
    setTimeout(() => {
      const clientData: ClientData = {
        tipoSolicitud: this.selectedTipoSolicitud,
        tipoDocumento: this.selectedTipoId,
        numeroDocumento: this.numeroIdentificacion,
        nombreCliente: 'JUAN PÉREZ GONZÁLEZ',
        telefono: '3001234567',
        email: 'juan.perez@example.com'
      };
      
      this.clientData = clientData;
      this.clientDataService.updateClientData(clientData);
      this.isLoading = false;
    }, 1500);
  }
}
