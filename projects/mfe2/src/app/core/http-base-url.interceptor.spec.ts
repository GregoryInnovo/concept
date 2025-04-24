import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  private readonly apiUrls = {
    emision: environment?.urlEmision,
    // anulacion: 'https://api.miapp.com/anulacion',
    // pagos: 'https://api.miapp.com/pagos'
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si ya tiene http o https, no la modificamos
    if (req.url.startsWith('http')) {
      return next.handle(req);
    }

    let baseUrl = '';
    let trimmedUrl = req.url;

    if (req.url.startsWith('emision/')) {
      baseUrl = this.apiUrls.emision;
      trimmedUrl = req.url.replace(/^emision\//, '');
    } else {
      console.warn('No se encontró una URL base para:', req.url);
    }
    // else if (req.url.startsWith('anulacion/')) {
    //   baseUrl = this.apiUrls.anulacion;
    //   trimmedUrl = req.url.replace(/^anulacion\//, '');
    // } else if (req.url.startsWith('pagos/')) {
    //   baseUrl = this.apiUrls.pagos;
    //   trimmedUrl = req.url.replace(/^pagos\//, '');
    // } 

    const apiReq = req.clone({ url: `${baseUrl}/${trimmedUrl}` });
    return next.handle(apiReq);
  }
}
