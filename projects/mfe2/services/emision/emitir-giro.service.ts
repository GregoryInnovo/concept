import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmitirGiroRequest {
  idGiro: number;
  codigoEstado: string;
  codigoTipo: string;
  nombreOficina: string;
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
  ivaComision: number;
  gmfIvaComision: number;
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
  // private readonly apiUrl = 'http://ec2-3-19-197-200.us-east-2.compute.amazonaws.com:8081/api/emision/emitir-giro';
  private readonly apiUrl = 'http://localhost:8080/api/emision/emitir-giro';

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
