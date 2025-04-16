import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsultaGiroComponent } from '../../components/consulta-giro/consulta-giro.component';
import { ValidacionBiometricaComponent } from '../../components/validacion-biometrica/validacion-biometrica.component';
import { ValorGiroComponent } from '../../components/valor-giro/valor-giro.component';
import { BeneficiarioGiroComponent } from '../../components/beneficiario-giro/beneficiario-giro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    ConsultaGiroComponent, 
    ValidacionBiometricaComponent,
    ValorGiroComponent,
    BeneficiarioGiroComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentStep = 1;
  totalSteps = 5;

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
    },
    {
      number: 5,
      title: 'Confirmación',
      description: 'Revise y confirme los detalles del giro'
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
