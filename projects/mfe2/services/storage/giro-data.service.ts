import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GiroData {
  // Datos del solicitante
  tipoSolicitud: string;
  tipoDocumentoSolicitante: string;
  numeroDocumentoSolicitante: string;
  nombreSolicitante: string;
  telefonoSolicitante: string;
  emailSolicitante: string;
  cuentaOrigen: string;

  // Datos del beneficiario
  tipoDocumentoBeneficiario: string;
  numeroDocumentoBeneficiario: string;
  nombreBeneficiario: string;

  // Datos del autorizado (opcional)
  tipoDocumentoAutorizado?: string;
  numeroDocumentoAutorizado?: string;
  nombreAutorizado?: string;

  // Datos de la transacción
  numeroGiro?: string;
  valorGiro: number;
  comision: number;
  ivaComision: number;
  gmfComision: number;
  gmfIva: number;
  valorTotal: number;

  // Datos de la oficina
  codigoOficina: string;
  nombreOficina: string;
  regional: string;
  cajero: string;

  // Fecha y hora
  fechaEmision: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GiroDataService {
  private giroDataSubject = new BehaviorSubject<GiroData | null>(null);
  giroData$ = this.giroDataSubject.asObservable();

  updateGiroData(data: Partial<GiroData>) {
    const currentData = this.giroDataSubject.getValue();
    this.giroDataSubject.next({
      ...currentData,
      ...data
    } as GiroData);
  }

  getGiroData(): GiroData | null {
    return this.giroDataSubject.getValue();
  }

  calcularValores(valorGiro: number) {
    const comision = this.calcularComision(valorGiro);
    const ivaComision = comision * 0.19; // 19% IVA
    const gmfComision = comision * 0.004; // 0.4% GMF
    const gmfIva = ivaComision * 0.004; // 0.4% GMF sobre IVA
    const valorTotal = valorGiro + comision + ivaComision + gmfComision + gmfIva;

    return {
      valorGiro,
      comision,
      ivaComision,
      gmfComision,
      gmfIva,
      valorTotal
    };
  }

  private calcularComision(valorGiro: number): number {
    // Lógica de cálculo de comisión según reglas de negocio
    if (valorGiro <= 50000) return 2000;
    if (valorGiro <= 100000) return 4000;
    if (valorGiro <= 250000) return 6000;
    if (valorGiro <= 500000) return 8000;
    return valorGiro * 0.02; // 2% para montos mayores
  }

  clearGiroData() {
    this.giroDataSubject.next(null);
  }
} 