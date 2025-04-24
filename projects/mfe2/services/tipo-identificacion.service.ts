import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TipoIdentificacion {
  codigo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class TipoIdentificacionService {
  private apiUrl = 'http://localhost:8080/api/emision/tipo-identificacion';

  constructor(private http: HttpClient) {}

  getTiposIdentificacion(): Observable<TipoIdentificacion[]> {
    return this.http.get<{ statusCode: number; message: string; data: TipoIdentificacion[] }>(this.apiUrl).pipe(
      map((resp) => resp.data as TipoIdentificacion[])
    );
  }
}
