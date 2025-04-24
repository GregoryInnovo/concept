import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TipoIdentificacion {
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class TipoIdentificacionService {
  constructor() {}

  getTiposIdentificacion(): Observable<TipoIdentificacion[]> {
    // Datos estáticos mientras se resuelve el problema de HttpClient
    const tiposIdentificacion: TipoIdentificacion[] = [
      { codigo: 'CC', descripcion: 'Cedula de Ciudadania' },
      { codigo: 'CE', descripcion: 'Cedula de Extranjeria' },
      { codigo: 'PT', descripcion: 'PERMISO POR PROTECCIÓN TEMPORAL' },
      { codigo: 'NIT', descripcion: 'Número de Identificación Tributaria' }
    ];
    return of(tiposIdentificacion);
  }
}
