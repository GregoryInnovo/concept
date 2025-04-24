import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClientData {
  tipoSolicitud: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombreCliente: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private clientDataSubject = new BehaviorSubject<ClientData | null>(null);
  clientData$ = this.clientDataSubject.asObservable();

  updateClientData(data: ClientData) {
    this.clientDataSubject.next(data);
  }

  getClientData(): ClientData | null {
    return this.clientDataSubject.getValue();
  }

  clearClientData() {
    this.clientDataSubject.next(null);
  }
} 