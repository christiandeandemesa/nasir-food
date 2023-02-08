import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  // Checks if the user has a token.
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.userService.currentUser;
    // Creates a clone of the given object.
    if (user.token) {
      request = request.clone({
        setHeaders: {
          access_token: user.token,
        },
      });
    }

    return next.handle(request);
  }
}
