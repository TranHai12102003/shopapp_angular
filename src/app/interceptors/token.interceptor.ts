import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    const token = this.tokenService.getToken();
    if (token) {
      //nhân bản cái req rồi sửa token xong tham chiếu ngược lại cái req cũ
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}