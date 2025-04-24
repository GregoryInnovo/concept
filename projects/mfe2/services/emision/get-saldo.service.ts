import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCuentas } from './get-cuentas.service';

export interface ResponseSaldo {
    statusCode: number
    message: string
    data: number
}

@Injectable({
    providedIn: 'root',
})
export class GetSaldoService {
    private apiUrl = 'emision/saldo';

    constructor(private http: HttpClient) { }

    getSaldoCuenta(tipoDocumento: string, numeroDocumento: string, cuenta: ResponseCuentas | null): Observable<any> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseSaldo }>(`${this.apiUrl}?tipoId=${tipoDocumento}&identificacion=${numeroDocumento}&cuenta=${cuenta?.numeroCuenta}&tipoCuenta=${cuenta?.tipoCuenta}`).pipe(
            map((resp) => resp)
        );
    }
}
