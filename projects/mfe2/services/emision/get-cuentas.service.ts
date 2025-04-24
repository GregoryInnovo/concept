import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseCuentas {
    numeroCuenta: string
    tipoCuenta: string
    activa: boolean
    saldo: number
    sobregiro: boolean
}

@Injectable({
    providedIn: 'root',
})
export class GetCuentasService {
    private apiUrl = 'emision/cuentas';

    constructor(private http: HttpClient) { }

    getClientCuentas(tipoDocumento: string, numeroDocumento: string): Observable<ResponseCuentas[]> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseCuentas[] }>(`${this.apiUrl}/${tipoDocumento}/${numeroDocumento}`).pipe(
            map((resp) => resp.data)
        );
    }
}
