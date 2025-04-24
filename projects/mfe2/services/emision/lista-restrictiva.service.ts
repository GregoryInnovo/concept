import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseLista {
    statusCode: number
    message: string
    data: number
}

@Injectable({
    providedIn: 'root',
})
export class ListaRestrictivaService {
    private apiUrl = 'emision/lista-resctrictiva';

    constructor(private http: HttpClient) { }

    getClientListaRestrictiva(tipoDocumento: string, numeroDocumento: string): Observable<any> {
        return this.http.get<{ statusCode: number; message: string; data: ResponseLista }>(`${this.apiUrl}/${tipoDocumento}/${numeroDocumento}`).pipe(
            map((resp) => resp)
        );
    }
}
