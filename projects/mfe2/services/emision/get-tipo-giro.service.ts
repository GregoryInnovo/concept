import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseTipoGiro {
    codigo: string
    descripcion: string
}

@Injectable({
    providedIn: 'root',
})
export class GetTipoGiro {
    private apiUrl = 'emision/tipo-giro';

    constructor(private http: HttpClient) { }

    getTipoGiros(): Observable<ResponseTipoGiro[]> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseTipoGiro[] }>(this.apiUrl).pipe(
            map((resp) => resp.data)
        );
    }
}
