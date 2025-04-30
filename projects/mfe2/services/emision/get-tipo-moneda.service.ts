import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseTipoMoneda {
    codigo: string
    descripcion: string
}

@Injectable({
    providedIn: 'root',
})
export class GetTipoMonedaService {
    private apiUrl = 'emision/moneda';

    constructor(private http: HttpClient) { }

    getTipoMoneda(): Observable<ResponseTipoMoneda[]> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseTipoMoneda[] }>(this.apiUrl).pipe(
            map((resp) => resp.data)
        );
    }
}
