import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isUserAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return next.handle(req);
        }
        return this.authService.getToken().pipe(
          take(1),
          switchMap(token => {
            if (!token) {
              return next.handle(req);
            }
            const modifiedReq = req.clone({
              params: req.params.set('auth', token)
            });
            return next.handle(modifiedReq);
          })
        );
      })
    );
  }
}
