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

  valorGiro: string = '25000000';
  cuentaOrigen: string = '406531313';
  valorComision: string = '20.000,00';
  ivaComision: string = '3.800,00';
  gmfIvaComision: string = '15,20';
  gmfComision: string = '80,00';
  valorTotal: string = '282.150,00';
  oficinasPago: string[] = [
    'Oficina Santa Barbara',
    'Oficina Galerias', 
    'Oficina Avenida Chile',
    'Oficina Niza',
    'Oficina Centro Internacional',
    'Oficina Unicentro Bogota',
    'Oficina Ciudad Salitre',
    'Oficina Calle 80 Bogota', 
    'Oficina Principal Bogota',
    'Oficna Plaza de las Américas',
    'Oficna Cedritos',
    'Oficina Chapinero',
    'Oficina Sogamoso',
    'Oficina Villavicencio',
    'Oficina Tunja',
    'Oficina Yopal',
    'Oficina Chia',
    'Oficina Duitama',
    'Buga',
    'Oficina Buenaventura',
    'Oficina Sur Cali',
    'Oficina Centro Cali', 
    'Oficina Sede Nacional Cali',
    'Oficina Imbanaco Cali',
    'Oficina Unicentro Cali',
    'Oficina Chipichape Cali',
    'Oficina Cosmocentro Cali',
    'Oficina Liviana Farallones Cali',
    'Oficina Florencia',
    'Oficina Ibague',
    'Oficina Neiva',
    'Oficina Popayan',
    'Oficina Pasto',
    'Oficina Tulua',
    'Oficina Prado Barranquilla',
    'Oficina Barranquilla Norte',
    'Oficina Calle 93 Barranquilla',
    'Oficina Unico Barranquilla',
    'Oficina Valledupar',
    'Oficina Manga Cartagena', 
    'Oficina Santa Marta',
    'Oficina Sincelejo',
    'Oficina Riohacha',
    'Oficina Cartago',
    'Oficina Manizales Centro',
    'Oficina Armenia Centro',
    'Oficina Manizales El Cable',
    'Oficina Pereira Centro',
    'Oficina Prometeo',
    'Oficina Armenia Norte',
    'Oficina Barrancabermeja',
    'Oficina Bucaramanga',
    'Oficina Cucuta',
    'Oficina Envigado',
    'Oficina Mayorca',
    'Oficina Ayacucho Medellin',
    'Oficina Oviedo Medellin',
    'Oficina Las Americas Medellin',
    'Oficina La 33 Medellin',
    'Oficina Monteria',
    'Oficina Pamplona', 
    'Oficina Quibdo',
    'Oficina Rionegro',
    'Oficina Apartado',
    'Oficina Floridablanca',
    'Oficina Centro Palmira',
    'Oficina Versalles Palmira',
    'Oficina Llanogrande Palmira',
    'Banca Express',
    'Oficina Virtual'
  ];
  oficinaPagoSeleccionada: string = '';

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
