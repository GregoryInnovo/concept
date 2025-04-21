import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientDataService } from '../../services/client-data.service';

@Component({
  selector: 'app-valor-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valor-giro.component.html',
  styleUrls: ['./valor-giro.component.css']
})
export class ValorGiroComponent implements OnInit {
  @Output() valorConfirmado = new EventEmitter<void>();

  clientData = {
    tipoSolicitud: '',
    tipoDocumento: '',
    numeroDocumento: '',
    nombreCliente: '',
    telefono: '',
    email: ''
  };

  valorGiro: string = '250.000,00';
  cuentaOrigen: string = '406531313';
  valorComision: string = '20.000,00';
  valorTotal: string = '282.150,00';

  cuentasDisponibles = [
    '406531313',
    '406531314',
    '406531315'
  ];

  constructor(private clientDataService: ClientDataService) {}

  ngOnInit() {
    // Suscribirse a los cambios en los datos del cliente
    this.clientDataService.clientData$.subscribe(data => {
      if (data) {
        this.clientData = data;
      }
    });

    // Obtener datos iniciales si existen
    const initialData = this.clientDataService.getClientData();
    if (initialData) {
      this.clientData = initialData;
    }
  }

  confirmarValor() {
    this.valorConfirmado.emit();
  }

  formatearValor(valor: string): string {
    // Aquí se podría implementar la lógica de formateo de valores monetarios
    return valor;
  }
}
