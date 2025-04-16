import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaGiroComponent } from '../consulta-giro/consulta-giro.component';
import { ValidacionBiometricaComponent } from '../validacion-biometrica/validacion-biometrica.component';
import { ValorGiroComponent } from '../valor-giro/valor-giro.component';
import { BeneficiarioGiroComponent } from '../beneficiario-giro/beneficiario-giro.component';

@Component({
  selector: 'app-emision-giros',
  standalone: true,
  imports: [
    CommonModule, 
    ConsultaGiroComponent, 
    ValidacionBiometricaComponent,
    ValorGiroComponent,
    BeneficiarioGiroComponent
  ],
  templateUrl: './emision-giros.component.html',
  styleUrls: ['./emision-giros.component.css']
})
export class EmisionGirosComponent {
  currentStep = 1;
  totalSteps = 4;

  steps = [
    {
      number: 1,
      title: 'Consulta',
      description: 'Ingrese el tipo y número de identificación del cliente'
    },
    {
      number: 2,
      title: 'Información del cliente',
      description: 'Valide la información del cliente'
    },
    {
      number: 3,
      title: 'Valor del Giro',
      description: 'Ingrese el valor del giro y la cuenta de origen'
    },
    {
      number: 4,
      title: 'Beneficiario',
      description: 'Ingrese los datos del beneficiario del giro'
    }
  ];

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
} 