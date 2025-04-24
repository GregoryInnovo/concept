import { HttpInterceptorFn } from '@angular/common/http';

export const httpBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
