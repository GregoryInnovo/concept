import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-giro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-giro.component.html',
  styleUrls: ['./consulta-giro.component.css']
})
export class ConsultaGiroComponent {
  tiposIdentificacion = ['CC', 'CE', 'NIT', 'PT'];
  selectedTipoId: string = 'CC';
  numeroIdentificacion: string = '';

  onBuscar() {
    // Functionality will be implemented later
    console.log('Búsqueda con:', {
      tipo: this.selectedTipoId,
      numero: this.numeroIdentificacion
    });
  }
}
