import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Cliente {
    celular: string
    email: string
    identificacion: string
    nombre: string
    tipoIdentificacion: string
}

export interface ResponseCliente {
    statusCode: number
    message: string;
    data: Cliente
}

@Injectable({
    providedIn: 'root',
})
export class GteClienteService {
    private apiUrl = 'emision/cliente';

    constructor(private http: HttpClient) { }

    getClienteInfo(tipoDocumento: string, numeroDocumento: string): Observable<ResponseCliente> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseCliente }>(`${this.apiUrl}/${tipoDocumento}/${numeroDocumento}`).pipe(
            map((resp) => resp.data)
        );
    }
}
