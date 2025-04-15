import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprobanteGiroComponent } from '../comprobante-giro/comprobante-giro.component';

@Component({
  selector: 'app-beneficiario-giro',
  standalone: true,
  imports: [CommonModule, FormsModule, ComprobanteGiroComponent],
  templateUrl: './beneficiario-giro.component.html',
  styleUrls: ['./beneficiario-giro.component.css']
})
export class BeneficiarioGiroComponent {
  @Output() beneficiarioConfirmado = new EventEmitter<void>();
  @Output() reiniciarProceso = new EventEmitter<void>();

  showComprobante = false;

  clienteData = {
    tipoDocumento: 'CC',
    numeroDocumento: '1019963258',
    nombreCliente: 'Pepito Perez',
    telefono: '311 2896300',
    email: 'pepitoperez76@gmail.com',
    valorTotalGiro: '282.150,00',
    cuentaOrigen: '406531313'
  };

  beneficiarioData = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombreCliente: ''
  };

  tiposDocumento = ['CC', 'CE', 'NIT', 'PT'];

  emitir() {
    this.showComprobante = true;
  }

  onCerrarComprobante() {
    this.showComprobante = false;
    this.reiniciarProceso.emit();
  }
}
