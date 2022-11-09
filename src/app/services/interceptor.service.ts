import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private authenticacionService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var currentUser = this.authenticacionService.AuthUser;
    if (currentUser && currentUser.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }
    console.log("Interceptor is running..." + JSON.stringify(currentUser));
    return next.handle(req);
  }
}
