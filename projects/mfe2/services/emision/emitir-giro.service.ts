import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmitirGiroRequest {
  idGiro: number;
  codigoEstado: string;
  codigoTipo: string;
  usuarioRed: string;
  identificacionBeneficiario: string;
  nombreBeneficiario: string;
  tipoIdentificacionBeneficiario: string;
  identificacionSolicitante: string;
  nombreSolicitante: string;
  tipoIdentificacionSolicitante: string;
  emailSolicitante: string;
  celularSolicitante: string;
  valorSolicitud: number;
  valorComision: number;
  gmfComision: number;
  totalPagar: number;
  cuentaOrigen: string;
}

export interface EmitirGiroResponse {
  statusCode: number;
  message: string;
  data: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmitirGiroService {
  // URL base del backend (cambiar el path según el endpoint real)
  // Endpoint completo para emitir giro
  private readonly apiUrl = 'emision/emitir-giro';

  constructor(private http: HttpClient) {}

  emitirGiro(body: EmitirGiroRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<{ statusCode: number; message: string; data: boolean }>(this.apiUrl, body, { headers })
      .pipe(
        map((resp: { statusCode: number; message: string; data: boolean }) => resp.data)
      );
  }
}
