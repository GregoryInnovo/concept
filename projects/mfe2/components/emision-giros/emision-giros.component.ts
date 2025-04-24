import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaGiroComponent } from '../consulta-giro/consulta-giro.component';
import { ValorGiroComponent } from '../valor-giro/valor-giro.component';
import { BeneficiarioGiroComponent } from '../beneficiario-giro/beneficiario-giro.component';
import { GiroDataService } from '../../services/giro-data.service';

@Component({
  selector: 'app-emision-giros',
  standalone: true,
  imports: [
    CommonModule,
    ConsultaGiroComponent, 
    ValorGiroComponent,
    BeneficiarioGiroComponent
  ],
  templateUrl: './emision-giros.component.html',
  styleUrls: ['./emision-giros.component.css']
})
export class EmisionGirosComponent {
  currentStep = 1;
  totalSteps = 3;
  pasoConsultaCompleto = false;

  steps = [
    {
      number: 1,
      title: 'Consulta',
      description: 'Ingrese el tipo y número de identificación del cliente'
    },
    {
      number: 2,
      title: 'Valor del Giro',
      description: 'Ingrese el valor del giro y seleccione la cuenta de origen'
    },
    {
      number: 3,
      title: 'Beneficiario',
      description: 'Ingrese los datos del beneficiario para completar el giro'
    }
  ];

  constructor(public giroDataService: GiroDataService) {}

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  actualizarEstadoPaso(datosListos: boolean) {
    this.pasoConsultaCompleto = datosListos;
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.pasoConsultaCompleto;
      case 2:
        const giroData = this.giroDataService.getGiroData();
        return giroData && giroData.valorGiro ? giroData.valorGiro > 0 : false;
      case 3:
        return true;
      default:
        return false;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      if (!this.canProceedToNextStep()) {
        if (this.currentStep === 1) {
          alert('Por favor complete la búsqueda del cliente antes de continuar');
        } else if (this.currentStep === 2) {
          alert('Por favor complete la información del valor del giro antes de continuar');
        } else {
          alert('Por favor complete todos los campos requeridos antes de continuar');
        }
        return;
      }
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
} 